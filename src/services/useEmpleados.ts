import toast from 'react-hot-toast';
import { v4 as createUuid } from 'uuid';
import firebaseApp from "@firebaseConfig";
import { Empleado } from "@features/empleados/models/Empleado";
import { AutocompleteOption } from '@models/AutocompleteOption';
import { doc, getDocs, getDoc, setDoc, collection, getFirestore, runTransaction, deleteDoc, DocumentSnapshot } from "firebase/firestore";

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

    const getEmpleadoOptions = async () => {
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

    const getEmpleadoById = async (id: string): Promise<Empleado | null> => {
        try {
            const docRef = doc(db, COLLECTION, id);
            const docSnap: DocumentSnapshot = await getDoc(docRef);

            if (docSnap.exists()) {
                // Obtener los datos del documento
                const empleadoData = docSnap.data();

                // Verificar si los datos cumplen con el tipo Empleado
                if (empleadoData && typeof empleadoData === 'object') {
                    const empleado: Empleado = {
                        id: empleadoData.id,
                        nombres: empleadoData.nombres,
                        apellidos: empleadoData.apellidos,
                        correo: empleadoData.correo,
                        celular: empleadoData.celular,
                        direccion: empleadoData.direccion,
                    };

                    return empleado;
                } else {
                    throw new Error(`El documento no contiene datos válidos para un empleado: ${id}`);
                }
            } else {
                return null; // El empleado no existe
            }
        } catch (error) {
            console.error(`Error al obtener empleado por ID ${id}:`, error);
            throw error;
        }
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
            console.log({ response });
            toast.success("Empleado eliminado exitosamente!");
        } catch (error) {
            console.error(error);
        }
    };

    return {
        getAllEmpleados,
        getEmpleadoOptions,
        getEmpleadoById,
        createEmpleado,
        updateEmpleado,
        deleteEmpleado,
    };
}