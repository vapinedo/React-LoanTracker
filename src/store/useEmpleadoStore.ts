import { create } from 'zustand';
import useEmpleados from '@services/useEmpleados';
import { Empleado } from '@features/empleados/models/Empleado';
import { AutocompleteOption } from '@models/AutocompleteOption';

interface EmpleadosState {
  empleados: Empleado[];
  empleadoOptions: AutocompleteOption[];
  loading: boolean;
  error: string | null;
  getAllEmpleados: () => Promise<void>;
  getEmpleadoOptions: () => Promise<void>;
  getEmpleadoById: (id: string) => Promise<void>;
  createEmpleado: (empleado: Empleado) => Promise<void>;
  deleteEmpleado: (id: string) => Promise<void>;
}

const useEmpleadoStore = create<EmpleadosState>((set) => ({
  empleados: [],
  empleadoOptions: [],
  loading: false,
  error: null,
  getAllEmpleados: async () => {
    try {
      set({ loading: true, error: null });
      const empleados = await useEmpleados().getAllEmpleados();
      set({ empleados, empleadoOptions: [], loading: false });
    } catch (error) {
      set({ loading: false, error: 'Error al obtener los empleados' });
      console.error(error);
    }
  },
  
  getEmpleadoOptions: async () => {
    try {
      set({ loading: true, error: null });
      const empleadoOptions = await useEmpleados().getEmpleadoOptions();
      set({ empleados: [], empleadoOptions, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Error al obtener opciones de empleados' });
      console.error(error);
    }
  },

  getEmpleadoById: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const empleado = await useEmpleados().getEmpleadoById(id);
      if (empleado) {
        set({ empleados: [empleado], empleadoOptions: [], loading: false });
      } else {
        set({ loading: false, error: `No se encontró empleado con ID ${id}` });
      }
    } catch (error) {
      set({ loading: false, error: `Error al obtener empleado con ID ${id}` });
      console.error(error);
    }
  },

  createEmpleado: async (empleado: Empleado) => {
    try {
      set({ loading: true, error: null });
      await useEmpleados().createEmpleado(empleado);
      set({ loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: 'Error al crear empleado' });
      console.error('Error al crear empleado:', error);
      throw error;
    }
  },

  deleteEmpleado: async (id: string) => {
    try {
      set({ loading: true, error: null });
      await useEmpleados().deleteEmpleado(id);
      // Filtrar empleados en el estado para eliminar el empleado eliminado
      set((state) => ({
        empleados: state.empleados.filter((empleado) => empleado.id !== id),
        empleadoOptions: [],
        loading: false,
        error: null,
      }));
    } catch (error) {
      set({ loading: false, error: `Error al eliminar empleado con ID ${id}` });
      console.error(`Error al eliminar empleado con ID ${id}:`, error);
      throw error;
    }
  },
}));

export default useEmpleadoStore;
