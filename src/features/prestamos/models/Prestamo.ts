import { DocumentReference } from "firebase/firestore";

export interface Prestamo {
    id: string;
    monto: number;
    estado: string;
    interes: number;
    fechaFinal: number;
    fechaInicio: number;
    modalidadDePago: string;
    clienteRef: DocumentReference | null;
    empleadoRef: DocumentReference | null;
}