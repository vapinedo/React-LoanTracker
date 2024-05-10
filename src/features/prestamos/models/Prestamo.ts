export interface Prestamo {
    id: string;
    clienteId: string | null;
    empleadoId: string | null;
    monto: number;
    interes: number;
    fechaInicio: number;
    fechaFinal: number;
    estado: string;
    modalidadDePago: string;
}