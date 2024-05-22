import { create } from 'zustand';
import useEmpleadoService from '@services/useEmpleadoService';
import { PersistStorage, persist } from 'zustand/middleware';
import { Empleado } from '@features/empleados/models/Empleado';
import { AutocompleteOption } from '@models/AutocompleteOption';

interface EmpleadoStore {
  empleados: Empleado[];
  empleadoOptions: AutocompleteOption[];
  loading: boolean;
  error: string | null;
  fetchEmpleados: () => Promise<void>;
  getEmpleadoOptions: () => Promise<void>;
  getEmpleado: (id: string) => Empleado | undefined;
  createEmpleado: (empleado: Empleado) => Promise<void>;
  updateEmpleado: (empleado: Empleado) => Promise<void>;
  deleteEmpleado: (id: string) => Promise<void>;
}

const serialize = (document: Empleado): any => {
  return {
    ...document,
  };
};

const deserialize = (prestamo: any): Empleado => {
  return {
    ...prestamo,
  };
};

const storage: PersistStorage<EmpleadoStore> = {
  getItem: (name) => {
    const item = sessionStorage.getItem(name);
    if (item) {
      const parsed = JSON.parse(item);
      return {
        ...parsed,
        state: {
          ...parsed.state,
          empleados: parsed.state.empleados.map(deserialize),
        },
      };
    }
    return null;
  },
  setItem: (name, value) => {
    const serializedState = JSON.stringify({
      ...value,
      state: {
        ...value.state,
        empleados: value.state.empleados.map(serialize),
      },
    });
    sessionStorage.setItem(name, serializedState);
  },
  removeItem: (name) => sessionStorage.removeItem(name),
};

const useClienteStore = create<EmpleadoStore>()(
  persist(
    (set, get) => ({
      empleados: [],
      empleadoOptions: [],
      loading: false,
      error: null,

      fetchEmpleados: async () => {
        try {
          set({ loading: true, error: null });
          const empleados = await useEmpleadoService().getAllEmpleados();
          set({ empleados, empleadoOptions: [], loading: false });
        } catch (error) {
          set({ loading: false, error: 'Error al obtener los empleados' });
          console.error(error);
        }
      },

      getEmpleadoOptions: async () => {
        try {
          set({ loading: true, error: null });
          const empleadoOptions = await useEmpleadoService().getEmpleadoOptions();
          set({ empleados: [], empleadoOptions, loading: false });
        } catch (error) {
          set({ loading: false, error: 'Error al obtener opciones de empleados' });
          console.error(error);
        }
      },

      getEmpleado: (id: string) => {
        const { empleados } = get();
        return empleados.find(empleado => empleado.id === id);
      },

      createEmpleado: async (empleado: Empleado) => {
        set({ loading: true, error: null });
        try {
          await useEmpleadoService().createEmpleado(empleado);
          await get().fetchEmpleados();
        } catch (error: unknown) {
          if (error instanceof Error) {
            set({ error: error.message, loading: false });
          } else {
            set({ error: String(error), loading: false });
          }
        }
      },

      updateEmpleado: async (empleado: Empleado) => {
        set({ loading: true, error: null });
        try {
          await useEmpleadoService().updateEmpleado(empleado);
          await get().fetchEmpleados();
        } catch (error: unknown) {
          if (error instanceof Error) {
            set({ error: error.message, loading: false });
          } else {
            set({ error: String(error), loading: false });
          }
        }
      },

      deleteEmpleado: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await useEmpleadoService().deleteEmpleado(id);
            await get().fetchEmpleados();
        } catch (error: unknown) {
            if (error instanceof Error) {
                set({ error: error.message, loading: false });
            } else {
                set({ error: String(error), loading: false });
            }
        }
    }

    }),
    {
      name: "empleados-store",
      storage,
    }
  )
);

export default useClienteStore;
