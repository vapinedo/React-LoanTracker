import { DocumentReference } from "firebase/firestore";

export interface Prestamo {
    id: string;
    estado: string;
    fechaFinal: number;
    fechaInicio: number;
    interes: number | null;
    modalidadDePago: string;
    monto_prestado: string | null;
    monto_adeudado: string | null;
    monto_abonado: string | null;
    clienteRef: DocumentReference | null;
    empleadoRef: DocumentReference | null;
}