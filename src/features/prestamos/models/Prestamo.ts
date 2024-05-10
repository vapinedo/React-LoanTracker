export interface Prestamo {
    id: string;
    clienteId: string | null;
    empleadoId: string | null;
    clienteNombre: string | null;
    empleadoNombre: string | null;
    monto: number;
    interes: number;
    fechaInicio: number;
    fechaFinal: number;
    estado: string;
    modalidadDePago: string;
}