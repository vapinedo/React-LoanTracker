import { create } from 'zustand';
import useClientes from '@services/useClientes';
import { Cliente } from '@features/clientes/models/Cliente';
import { AutocompleteOption } from '@models/AutocompleteOption';

interface ClienteState {
  clientes: Cliente[];
  clienteOptions: AutocompleteOption[];
  loading: boolean;
  error: string | null;
  getAllClientes: () => Promise<void>;
  getClienteOptions: () => Promise<void>;
  getClienteById: (id: string) => Promise<void>;
  createCliente: (cliente: Cliente) => Promise<void>;
  updateCliente: (cliente: Cliente) => Promise<void>;
  deleteCliente: (id: string) => Promise<void>;
}

const useClienteStore = create<ClienteState>((set) => ({
  clientes: [],
  clienteOptions: [],
  loading: false,
  error: null,
  getAllClientes: async () => {
    try {
      set({ loading: true, error: null });
      const clientes = await useClientes().getAllClientes();
      set({ clientes, clienteOptions: [], loading: false });
    } catch (error) {
      set({ loading: false, error: 'Error al obtener los clientes' });
      console.error(error);
    }
  },
  
  getClienteOptions: async () => {
    try {
      set({ loading: true, error: null });
      const clienteOptions = await useClientes().getClienteOptions();
      set({ clientes: [], clienteOptions, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Error al obtener opciones de clientes' });
      console.error(error);
    }
  },

  getClienteById: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const cliente = await useClientes().getClienteById(id);
      if (cliente) {
        set({ clientes: [cliente], clienteOptions: [], loading: false });
      } else {
        set({ loading: false, error: `No se encontró cliente con ID ${id}` });
      }
    } catch (error) {
      set({ loading: false, error: `Error al obtener cliente con ID ${id}` });
      console.error(error);
    }
  },

  createCliente: async (cliente: Cliente) => {
    try {
      set({ loading: true, error: null });
      await useClientes().createCliente(cliente);
      set({ loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: 'Error al crear cliente' });
      console.error('Error al crear cliente:', error);
      throw error;
    }
  },

  updateCliente: async (cliente: Cliente) => {
    try {
      set({ loading: true, error: null });
      await useClientes().updateCliente(cliente);
      set({ loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: 'Error al actualizar cliente' });
      console.error('Error al actualizar cliente:', error);
      throw error;
    }
  },

  deleteCliente: async (id: string) => {
    try {
      set({ loading: true, error: null });
      await useClientes().deleteCliente(id);
      // Filtrar clientes en el estado para eliminar el cliente eliminado
      set((state) => ({
        clientes: state.clientes.filter((cliente) => cliente.id !== id),
        clienteOptions: [],
        loading: false,
        error: null,
      }));
    } catch (error) {
      set({ loading: false, error: `Error al eliminar cliente con ID ${id}` });
      console.error(`Error al eliminar cliente con ID ${id}:`, error);
      throw error;
    }
  },
}));

export default useClienteStore;
