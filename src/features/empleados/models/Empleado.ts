export interface Empleado {
    id: string | null;
    nombres: string;
    apellidos: string;
    correo?: string | null;
    celular: string;
    direccion: string;
}