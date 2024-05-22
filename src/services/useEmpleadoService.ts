import db from '@firebaseConfig';
import toast from 'react-hot-toast';
import { v4 as createUuid } from 'uuid';
import { Empleado } from "@features/empleados/models/Empleado";
import { AutocompleteOption } from '@models/AutocompleteOption';
import { doc, getDocs, getDoc, setDoc, collection, runTransaction, deleteDoc } from "firebase/firestore";

const COLLECTION = "EMPLEADOS";

const handleFirestoreError = (error: any, customMessage: string) => {
    console.error(customMessage, error);
    toast.error(customMessage);
};

export default function useEmpleadoService() {

    const getAllEmpleados = async (): Promise<Empleado[]> => {
        const empleados: Empleado[] = [];
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION));
            for (const docSnapshot of querySnapshot.docs) {
                const clienteData = docSnapshot.data() as Empleado;
                empleados.push(clienteData);
            }
        } catch (error) {
            handleFirestoreError(error, "Error al obtener los empleados");
        }
        return empleados;
    };

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
            handleFirestoreError(error, "Error al obtener opciones de empleado");
        }
        return options;
    };

    const getEmpleadoById = async (id: string): Promise<Empleado | null> => {
        let empleado: Empleado | null = null;
        try {
            const docRef = doc(db, COLLECTION, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                empleado = docSnap.data() as Empleado;
            }
        } catch (error) {
            handleFirestoreError(error, `Error al obtener empleado por ID ${id}`);
        }
        return empleado;
    };

    const createEmpleado = async (empleado: Empleado) => {
        try {
            if (!empleado.id) {
                empleado.id = createUuid();
            }
            await setDoc(doc(db, COLLECTION, empleado.id), empleado);
            toast.success("Empleado creado exitosamente!");
        } catch (error) {
            handleFirestoreError(error, "Error al crear empleado");
        }
    };

    const updateEmpleado = async (empleado: Empleado) => {
        const docRef = doc(db, COLLECTION, empleado.id);
        try {
            await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(docRef);
                if (!sfDoc.exists()) {
                    throw new Error("No existe el empleado que quiere editar");
                }
                transaction.update(docRef, { ...empleado });
                toast.success("Empleado actualizado exitosamente!");
            });
        } catch (error) {
            handleFirestoreError(error, "Error al actualizar empleado");
        }
    };

    const deleteEmpleado = async (id: string) => {
        try {
            const docRef = doc(db, COLLECTION, id);
            await deleteDoc(docRef);
            toast.success("Empleado eliminado exitosamente!");
        } catch (error) {
            handleFirestoreError(error, "Error al eliminar empleado");
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
