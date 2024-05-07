import toast from 'react-hot-toast';
import { v4 as createUuid } from 'uuid';
import firebaseApp from "@firebaseConfig";
import { Empleado } from "@feature/empleados/models/Empleado";
import { doc, getDocs, getDoc, setDoc, collection, getFirestore, runTransaction, deleteDoc } from "firebase/firestore";

const COLLECTION = "EMPLEADOS";
const db = getFirestore(firebaseApp);

export default function useEmpleados() {

    const getAllEmpleados = async () => {
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

    const getEmpleadoById = async (documentId: string) => {
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

    const createEmpleado = async (document: Empleado) => {
        try {
            const documentId = createUuid();
            document.id = documentId;
            await setDoc(doc(db, COLLECTION, documentId), document);
            toast.success("Empleado creado exitosamente!");
        } catch (error) {
            console.log(error);
        }
    };

    const updateEmpleado = async (document: any) => {
        const docRef = doc(db, COLLECTION, document.id);
        try {
            await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(docRef);
                if (!sfDoc.exists()) {
                    throw "No existe el empleado que quiere editar";
                }
                transaction.update(docRef, document);
                toast.success("Empleado actualizado exitosamente!");
            });
        } catch (error) {
            console.error(error);
        }
    };
    
    const deleteEmpleado = async (documentId: string) => {
        try {
            const docRef = doc(db, COLLECTION, documentId);
            const response = await deleteDoc(docRef);
            console.log({response});
            toast.success("Empleado eliminado exitosamente!");
        } catch (error) {
            console.error(error);
        }
    };

    return {
        getAllEmpleados,
        getEmpleadoById,
        createEmpleado,
        updateEmpleado,
        deleteEmpleado,
    };
}