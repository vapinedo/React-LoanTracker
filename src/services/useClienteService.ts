import db from '@firebaseConfig';
import toast from 'react-hot-toast';
import { v4 as createUuid } from 'uuid';
import { Cliente } from "@features/clientes/models/Cliente";
import { AutocompleteOption } from '@models/AutocompleteOption';
import { doc, getDocs, getDoc, setDoc, collection, runTransaction, deleteDoc, DocumentSnapshot } from "firebase/firestore";

const COLLECTION = "CLIENTES";

export default function useClienteService() {

    const getAllClientes = async (): Promise<Cliente[]> => {
        const collection: Cliente[] = [];
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION));
            for (const docSnapshot of querySnapshot.docs) {
                const documentData = docSnapshot.data() as Cliente;
                collection.push(documentData);
            }
        } catch (error) {
            console.log(error);
        }
        return collection;
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

    const getClienteById = async (id: string): Promise<Cliente | null> => {
        try {
            const docRef = doc(db, COLLECTION, id);
            const docSnap: DocumentSnapshot = await getDoc(docRef);

            if (docSnap.exists()) {
                // Obtener los datos del documento
                const clienteData = docSnap.data();

                // Verificar si los datos cumplen con el tipo Cliente
                if (clienteData && typeof clienteData === 'object') {
                    const cliente: Cliente = {
                        id: clienteData.id,
                        nombres: clienteData.nombres,
                        apellidos: clienteData.apellidos,
                        correo: clienteData.correo,
                        celular: clienteData.celular,
                        direccion: clienteData.direccion,
                    };

                    return cliente;
                } else {
                    throw new Error(`El documento no contiene datos válidos para un cliente: ${id}`);
                }
            } else {
                return null; // El cliente no existe
            }
        } catch (error) {
            console.error(`Error al obtener cliente por ID ${id}:`, error);
            throw error;
        }
    };    

    const createCliente = async (document: Cliente) => {
        try {
            if (!document.id) {
                document.id = createUuid();
            }
            await setDoc(doc(db, COLLECTION, document.id), document);
            toast.success("Cliente creado exitosamente!");
        } catch (error) {
            console.log(error);
        }
    };

    const updateCliente = async (document: Cliente) => {
        const docRef = doc(db, COLLECTION, document.id);
        try {
            await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(docRef);
                if (!sfDoc.exists()) {
                    throw new Error("No existe el cliente que quiere editar");
                }
                const updatedData = {
                    id: document.id,
                    nombres: document.nombres,
                    apellidos: document.apellidos,
                    correo: document.correo,
                    celular: document.celular,
                    direccion: document.direccion,
                };
                transaction.update(docRef, updatedData);
                toast.success("Cliente actualizado exitosamente!");
            });
        } catch (error) {
            console.error(error);
        }
    };
    
    const deleteCliente = async (documentId: string) => {
        try {
            const docRef = doc(db, COLLECTION, documentId);
            await deleteDoc(docRef);
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