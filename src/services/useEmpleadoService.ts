import db from '@firebaseConfig';
import toast from 'react-hot-toast';
import { getDocs, collection } from "firebase/firestore";
import { Empleado } from "@features/empleados/models/Empleado";
import useFirestoreService from '@services/useFirestoreService';
import { AutocompleteOption } from '@models/AutocompleteOption';

const COLLECTION = "EMPLEADOS";
const { getAllDocuments, getDocumentById, createDocument, updateDocument, deleteDocument } = useFirestoreService<Empleado>(COLLECTION);

const getEmpleadoOptions = async (): Promise<AutocompleteOption[]> => {
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
        console.error("Error al obtener opciones de empleado", error);
        toast.error("Error al obtener opciones de empleado");
    }
    return options;
};

export default function useEmpleadoService() {
    return {
        getAllEmpleados: getAllDocuments,
        getEmpleadoById: getDocumentById,
        createEmpleado: createDocument,
        updateEmpleado: updateDocument,
        deleteEmpleado: deleteDocument,
        getEmpleadoOptions,
    };
}
