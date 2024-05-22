import useFirestoreService from './useFirestoreService';
import { Prestamo } from "@features/prestamos/models/Prestamo";
import { DocumentReference, getDoc } from "firebase/firestore";

const COLLECTION = "PRESTAMOS";
const { getAllDocuments, getDocumentById, createDocument, updateDocument, deleteDocument } = useFirestoreService<Prestamo>(COLLECTION);

const getClienteAndEmpleadoData = async (prestamo: Prestamo) => {
    const clienteData = (await getDoc(prestamo.clienteRef as DocumentReference)).data();
    const empleadoData = (await getDoc(prestamo.empleadoRef as DocumentReference)).data();
    return { clienteData, empleadoData };
};

export default function usePrestamoService() {
    return {
        getAllPrestamos: getAllDocuments,
        getPrestamoById: getDocumentById,
        createPrestamo: createDocument,
        updatePrestamo: updateDocument,
        deletePrestamo: deleteDocument,
        getClienteAndEmpleadoData,
    };
}