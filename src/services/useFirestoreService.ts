import db from '@firebaseConfig';
import toast from 'react-hot-toast';
import { v4 as createUuid } from 'uuid';
import { doc, getDocs, getDoc, setDoc, collection, runTransaction, deleteDoc } from "firebase/firestore";

const handleFirestoreError = (error: any, customMessage: string) => {
    console.error(customMessage, error);
    toast.error(customMessage);
};

export default function useFirestoreService<T>(COLLECTION: string) {

    const getAllDocuments = async (): Promise<T[]> => {
        const documents: T[] = [];
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION));
            for (const docSnapshot of querySnapshot.docs) {
                const documentData = docSnapshot.data() as T;
                documents.push(documentData);
            }
        } catch (error) {
            handleFirestoreError(error, `Error al obtener los documentos de ${COLLECTION}`);
        }
        return documents;
    };

    const getDocumentById = async (id: string): Promise<T | null> => {
        let document: T | null = null;
        try {
            const docRef = doc(db, COLLECTION, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                document = docSnap.data() as T;
            }
        } catch (error) {
            handleFirestoreError(error, `Error al obtener documento por ID ${id} de ${COLLECTION}`);
        }
        return document;
    };

    const createDocument = async (document: T & { id?: string }) => {
        try {
            if (!document.id) {
                document.id = createUuid();
            }
            await setDoc(doc(db, COLLECTION, document.id), document);
            toast.success("Documento creado exitosamente!");
        } catch (error) {
            handleFirestoreError(error, `Error al crear documento en ${COLLECTION}`);
        }
    };

    const updateDocument = async (document: T & { id: string }) => {
        const docRef = doc(db, COLLECTION, document.id);
        try {
            await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(docRef);
                if (!sfDoc.exists()) {
                    throw new Error(`No existe el documento que quiere editar en ${COLLECTION}`);
                }
                transaction.update(docRef, { ...document });
                toast.success("Documento actualizado exitosamente!");
            });
        } catch (error) {
            handleFirestoreError(error, `Error al actualizar documento en ${COLLECTION}`);
        }
    };

    const deleteDocument = async (id: string) => {
        try {
            const docRef = doc(db, COLLECTION, id);
            await deleteDoc(docRef);
            toast.success("Documento eliminado exitosamente!");
        } catch (error) {
            handleFirestoreError(error, `Error al eliminar documento en ${COLLECTION}`);
        }
    };

    return {
        getAllDocuments,
        getDocumentById,
        createDocument,
        updateDocument,
        deleteDocument,
    };
}
