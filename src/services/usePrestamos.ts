import toast from 'react-hot-toast';
import { v4 as createUuid } from 'uuid';
import firebaseApp from "@firebaseConfig";
import { Prestamo } from "@features/prestamos/models/Prestamo";
import { doc, getDocs, getDoc, setDoc, collection, getFirestore, runTransaction, deleteDoc } from "firebase/firestore";

const COLLECTION = "PRESTAMOS";
const db = getFirestore(firebaseApp);

export default function usePrestamos() {

    const getAllPrestamos = async () => {
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

    const getPrestamoById = async (documentId: string) => {
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

    const createPrestamo = async (document: Prestamo) => {
        try {
            await setDoc(doc(db, COLLECTION, document.id), document);
            toast.success("Prestamo creado exitosamente!");
        } catch (error) {
            console.log(error);
        }
    };

    const updatePrestamo = async (document: any) => {
        const docRef = doc(db, COLLECTION, document.id);
        try {
            await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(docRef);
                if (!sfDoc.exists()) {
                    throw "No existe el prestamo que quiere editar";
                }
                transaction.update(docRef, document);
                toast.success("Prestamo actualizado exitosamente!");
            });
        } catch (error) {
            console.error(error);
        }
    };
    
    const deletePrestamo = async (documentId: string) => {
        try {
            const docRef = doc(db, COLLECTION, documentId);
            const response = await deleteDoc(docRef);
            console.log({response});
            toast.success("Prestamo eliminado exitosamente!");
        } catch (error) {
            console.error(error);
        }
    };

    return {
        getAllPrestamos,
        getPrestamoById,
        createPrestamo,
        updatePrestamo,
        deletePrestamo,
    };
}