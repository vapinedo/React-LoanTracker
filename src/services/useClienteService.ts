import db from '@firebaseConfig';
import toast from 'react-hot-toast';
import { v4 as createUuid } from 'uuid';
import { Cliente } from "@features/clientes/models/Cliente";
import { AutocompleteOption } from '@models/AutocompleteOption';
import { doc, getDocs, getDoc, setDoc, collection, runTransaction, deleteDoc } from "firebase/firestore";

const COLLECTION = "CLIENTES";

const handleFirestoreError = (error: any, customMessage: string) => {
    console.error(customMessage, error);
    toast.error(customMessage);
};

export default function useClienteService() {

    const getAllClientes = async (): Promise<Cliente[]> => {
        const clientes: Cliente[] = [];
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION));
            for (const docSnapshot of querySnapshot.docs) {
                const clienteData = docSnapshot.data() as Cliente;
                clientes.push(clienteData);
            }
        } catch (error) {
            handleFirestoreError(error, "Error al obtener los clientes");
        }
        return clientes;
    };

    const getClienteOptions = async (): Promise<AutocompleteOption[]> => {
        const options: AutocompleteOption[] = [];
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION));
            querySnapshot.forEach((doc) => {
                const option = {
                    label: `${doc.data().nombres} ${doc.data().apellidos}`,
                    value: doc.data().id
                };
                options.push(option);
            });
        } catch (error) {
            handleFirestoreError(error, "Error al obtener opciones de cliente");
        }
        return options;
    };

    const getClienteById = async (id: string): Promise<Cliente | null> => {
        let cliente: Cliente | null = null;
        try {
            const docRef = doc(db, COLLECTION, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                cliente = docSnap.data() as Cliente;
            }
        } catch (error) {
            handleFirestoreError(error, `Error al obtener cliente por ID ${id}`);
        }
        return cliente;
    };

    const createCliente = async (cliente: Cliente) => {
        try {
            if (!cliente.id) {
                cliente.id = createUuid();
            }
            await setDoc(doc(db, COLLECTION, cliente.id), cliente);
            toast.success("Cliente creado exitosamente!");
        } catch (error) {
            handleFirestoreError(error, "Error al crear cliente");
        }
    };

    const updateCliente = async (cliente: Cliente) => {
        const docRef = doc(db, COLLECTION, cliente.id);
        try {
            await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(docRef);
                if (!sfDoc.exists()) {
                    throw new Error("No existe el cliente que quiere editar");
                }
                transaction.update(docRef, { ...cliente });
                toast.success("Cliente actualizado exitosamente!");
            });
        } catch (error) {
            handleFirestoreError(error, "Error al actualizar cliente");
        }
    };

    const deleteCliente = async (id: string) => {
        try {
            const docRef = doc(db, COLLECTION, id);
            await deleteDoc(docRef);
            toast.success("Cliente eliminado exitosamente!");
        } catch (error) {
            handleFirestoreError(error, "Error al eliminar cliente");
        }
    };

    return {
        getAllClientes,
        getClienteOptions,
        getClienteById,
        createCliente,
        updateCliente,
        deleteCliente,
    };
}
