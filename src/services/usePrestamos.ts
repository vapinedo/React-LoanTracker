import db from '@firebaseConfig';
import toast from 'react-hot-toast';
import { v4 as createUuid } from 'uuid';
import { Prestamo } from "@features/prestamos/models/Prestamo";
import { doc, getDocs, getDoc, setDoc, collection, runTransaction, deleteDoc, DocumentReference } from "firebase/firestore";

const COLLECTION = "PRESTAMOS";

export default function usePrestamos() {

    const getAllPrestamos = async (): Promise<Prestamo[]> => {
        const prestamos: Prestamo[] = [];
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION));
            for (const docSnapshot of querySnapshot.docs) {
                const prestamoData = docSnapshot.data() as Prestamo;
                prestamos.push(prestamoData);
            }
        } catch (error) {
            console.log(error);
        }
        return prestamos;
    };

    const getPrestamoById = async (documentId: string): Promise<Prestamo | null> => {
        let prestamo: Prestamo | null = null;
        try {
            const docRef = doc(db, COLLECTION, documentId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                prestamo = docSnap.data() as Prestamo;
            }
        } catch (error) {
            console.log(error);
        }
        return prestamo;
    };

    const createPrestamo = async (prestamo: Prestamo) => {
        try {
            if (!prestamo.id) {
                prestamo.id = createUuid();
            }
            await setDoc(doc(db, COLLECTION, prestamo.id), prestamo);
            toast.success("Prestamo creado exitosamente!");
        } catch (error) {
            console.log(error);
        }
    };

    const updatePrestamo = async (prestamo: Prestamo) => {
        const docRef = doc(db, COLLECTION, prestamo.id);
        try {
            await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(docRef);
                if (!sfDoc.exists()) {
                    throw new Error("No existe el prestamo que quiere editar");
                }
                const updatedData = {
                    monto: prestamo.monto,
                    estado: prestamo.estado,
                    interes: prestamo.interes,
                    fechaFinal: prestamo.fechaFinal,
                    fechaInicio: prestamo.fechaInicio,
                    modalidadDePago: prestamo.modalidadDePago,
                    clienteRef: prestamo.clienteRef,
                    empleadoRef: prestamo.empleadoRef
                };
                transaction.update(docRef, updatedData);
                toast.success("Prestamo actualizado exitosamente!");
            });
        } catch (error) {
            console.error(error);
        }
    };

    const deletePrestamo = async (documentId: string) => {
        try {
            const docRef = doc(db, COLLECTION, documentId);
            await deleteDoc(docRef);
            toast.success("Prestamo eliminado exitosamente!");
        } catch (error) {
            console.error(error);
        }
    };

    const getClienteAndEmpleadoData = async (prestamo: Prestamo) => {
        const clienteData = (await getDoc(prestamo.clienteRef as DocumentReference)).data();
        const empleadoData = (await getDoc(prestamo.empleadoRef as DocumentReference)).data();
        return { clienteData, empleadoData };
    };

    return {
        getAllPrestamos,
        getPrestamoById,
        createPrestamo,
        updatePrestamo,
        deletePrestamo,
        getClienteAndEmpleadoData,
    };
}
