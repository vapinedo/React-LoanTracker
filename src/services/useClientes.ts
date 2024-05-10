import toast from 'react-hot-toast';
import { v4 as createUuid } from 'uuid';
import firebaseApp from "@firebaseConfig";
import { Cliente } from "@features/clientes/models/Cliente";
import { AutocompleteOption } from '@models/AutocompleteOption';
import { doc, getDocs, getDoc, setDoc, collection, getFirestore, runTransaction, deleteDoc } from "firebase/firestore";

const COLLECTION = "CLIENTES";
const db = getFirestore(firebaseApp);

export default function useClientes() {

    const getAllClientes = async () => {
        const documents: any[] = [];
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION));
            querySnapshot.forEach((doc) => {
                documents.push(doc.data());
            });
        } catch (error) {
            console.log(error);
        }
        return documents;
    };

    const getClienteOptions = async () => {
        const documents: AutocompleteOption[] = [];
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION));
            querySnapshot.forEach((doc) => {
                const option = {
                    label: `${doc.data().nombres} ${doc.data().apellidos}`,
                    value: doc.data().id
                }
                documents.push(option);
            });
        } catch (error) {
            console.log(error);
        }
        return documents;
    };

    const getClienteById = async (documentId: string) => {
        let document = null;
        try {
            const docRef = doc(db, COLLECTION, documentId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                document = docSnap.data();
            }
        } catch (error) {
            console.log(error);
        }
        return document;
    };

    const createCliente = async (document: Cliente) => {
        try {
            const documentId = createUuid();
            document.id = documentId;
            await setDoc(doc(db, COLLECTION, documentId), document);
            toast.success("Cliente creado exitosamente!");
        } catch (error) {
            console.log(error);
        }
    };

    const updateCliente = async (document: any) => {
        const docRef = doc(db, COLLECTION, document.id);
        try {
            await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(docRef);
                if (!sfDoc.exists()) {
                    throw "No existe el cliente que quiere editar";
                }
                transaction.update(docRef, document);
                toast.success("Cliente actualizado exitosamente!");
            });
        } catch (error) {
            console.error(error);
        }
    };
    
    const deleteCliente = async (documentId: string) => {
        try {
            const docRef = doc(db, COLLECTION, documentId);
            const response = await deleteDoc(docRef);
            console.log({response});
            toast.success("Cliente eliminado exitosamente!");
        } catch (error) {
            console.error(error);
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