import db from '@firebaseConfig';
import toast from 'react-hot-toast';
import useFirestoreService from './useFirestoreService';
import { getDocs, collection } from "firebase/firestore";
import { Cliente } from "@features/clientes/models/Cliente";
import { AutocompleteOption } from '@models/AutocompleteOption';

const COLLECTION = "CLIENTES";
const { getAllDocuments, getDocumentById, createDocument, updateDocument, deleteDocument } = useFirestoreService<Cliente>(COLLECTION);

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
        console.error("Error al obtener opciones de cliente", error);
        toast.error("Error al obtener opciones de cliente");
    }
    return options;
};

export default function useClienteService() {
    return {
        getAllClientes: getAllDocuments,
        getClienteById: getDocumentById,
        createCliente: createDocument,
        updateCliente: updateDocument,
        deleteCliente: deleteDocument,
        getClienteOptions,
    };
}