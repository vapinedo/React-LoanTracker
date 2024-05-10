export interface Prestamo {
    id?: string | null;
    clienteId: string | null;
    empleadoId: string | null;
    monto: number;
    interes: number;
    fechaInicio: Date;
    fechaFinal: Date;
    estado: string;
    modalidadDePago: string;
}