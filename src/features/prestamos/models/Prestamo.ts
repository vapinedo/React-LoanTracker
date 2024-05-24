import { DocumentReference } from "firebase/firestore";

export interface Prestamo {
    id: string;
    monto: string | null;
    estado: string;
    interes: number | null;
    fechaFinal: number;
    fechaInicio: number;
    modalidadDePago: string;
    clienteRef: DocumentReference | null;
    empleadoRef: DocumentReference | null;
}