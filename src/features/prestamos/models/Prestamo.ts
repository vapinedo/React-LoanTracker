import { DocumentReference } from "firebase/firestore";

export interface Prestamo {
    id: string | null;
    monto: number | null;
    estado: string;
    interes: number | null;
    fechaFinal: number;
    fechaInicio: number;
    modalidadDePago: string;
    clienteRef: DocumentReference | null;
    empleadoRef: DocumentReference | null;
}