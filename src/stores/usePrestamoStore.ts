import { create } from 'zustand';
import usePrestamos from '@services/usePrestamos';
import { Prestamo } from '@features/prestamos/models/Prestamo';

// Define the store interface
interface PrestamoStore {
    prestamos: Prestamo[];
    loading: boolean;
    error: string | null;
    fetchPrestamos: () => Promise<void>;
    getPrestamo: (id: string) => Prestamo | undefined;
    createPrestamo: (prestamo: Prestamo) => Promise<void>;
    updatePrestamo: (prestamo: Prestamo) => Promise<void>;
    deletePrestamo: (id: string) => Promise<void>;
}

// Create the store
const usePrestamoStore = create<PrestamoStore>((set, get) => ({
    prestamos: [],
    loading: false,
    error: null,

    fetchPrestamos: async () => {
        set({ loading: true, error: null });
        try {
            const prestamos = await usePrestamos().getAllPrestamos();
            set({ prestamos, loading: false });
        } catch (error: unknown) {
            if (error instanceof Error) {
                set({ error: error.message, loading: false });
            } else {
                set({ error: String(error), loading: false });
            }
        }
    },

    getPrestamo: (id: string) => {
        const { prestamos } = get();
        return prestamos.find(prestamo => prestamo.id === id);
    },

    createPrestamo: async (prestamo: Prestamo) => {
        set({ loading: true, error: null });
        try {
            await usePrestamos().createPrestamo(prestamo);
            // Fetch the updated list of prestamos
            await get().fetchPrestamos();
        } catch (error: unknown) {
            if (error instanceof Error) {
                set({ error: error.message, loading: false });
            } else {
                set({ error: String(error), loading: false });
            }
        }
    },

    updatePrestamo: async (prestamo: Prestamo) => {
        set({ loading: true, error: null });
        try {
            await usePrestamos().updatePrestamo(prestamo);
            // Fetch the updated list of prestamos
            await get().fetchPrestamos();
        } catch (error: unknown) {
            if (error instanceof Error) {
                set({ error: error.message, loading: false });
            } else {
                set({ error: String(error), loading: false });
            }
        }
    },

    deletePrestamo: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await usePrestamos().deletePrestamo(id);
            // Fetch the updated list of prestamos
            await get().fetchPrestamos();
        } catch (error: unknown) {
            if (error instanceof Error) {
                set({ error: error.message, loading: false });
            } else {
                set({ error: String(error), loading: false });
            }
        }
    },
}));

export default usePrestamoStore;
