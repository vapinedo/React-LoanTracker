import { create } from 'zustand';
import useClienteStore from './useClienteStore';
import useEmpleadoStore from './useEmpleadoStore';
import usePrestamoStore from './usePrestamoStore';

interface DashboardStore {
  totalClientes: number;
  totalEmpleados: number;
  totalPrestamos: number;
  loading: boolean;
  error: string | null;
  fetchTotals: () => Promise<void>;
}

const useDashboardStore = create<DashboardStore>((set) => ({
  totalClientes: 0,
  totalEmpleados: 0,
  totalPrestamos: 0,
  loading: false,
  error: null,

  fetchTotals: async () => {
    try {
      set({ loading: true, error: null });
      const [totalClientes, totalEmpleados, totalPrestamos] = await Promise.all([
        useClienteStore.getState().totalClientes,
        useEmpleadoStore.getState().totalEmpleados,
        usePrestamoStore.getState().totalPrestamos,
      ]);
      set({ totalClientes, totalEmpleados, totalPrestamos, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Error al obtener totales' });
      console.error(error);
    }
  },
}));

export default useDashboardStore;
