import { create } from 'zustand';
import useEmpleados from '@services/useEmpleados';
import { Empleado } from '@features/empleados/models/Empleado';

interface EmpleadosState {
  empleados: Empleado[];
  loading: boolean;
  error: string | null;
  getAllEmpleados: () => Promise<void>;
}

const useEmpleadoStore = create<EmpleadosState>((set) => ({
  empleados: [],
  loading: false,
  error: null,
  getAllEmpleados: async () => {
    try {
      set({ loading: true, error: null });
      const empleados = await useEmpleados().getAllEmpleados();
      set({ empleados, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Error al obtener los empleados' });
      console.error(error);
    }
  },
}));

export default useEmpleadoStore;
