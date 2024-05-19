import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import usePrestamoStore from '@stores/usePrestamoStore';
import { Cliente } from '@features/clientes/models/Cliente';
import { Empleado } from '@features/empleados/models/Empleado';
import { loadPrestamo } from '@features/prestamos/PrestamoHelper';

const usePrestamo = (isEditMode: boolean) => {
    const { id } = useParams<{ id: string }>();
    const { getPrestamo, reset } = usePrestamoStore();
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [empleado, setEmpleado] = useState<Empleado | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (isEditMode && id) {
                try {
                    const prestamo = await getPrestamo(id);
                    if (prestamo) {
                        loadPrestamo(prestamo, reset, setCliente, setEmpleado);
                    }
                } catch (error) {
                    console.error("Error loading prestamo:", error);
                }
            }
        };

        fetchData();

        return () => {
            // Cleanup function if needed
        };
    }, [isEditMode, id, reset, getPrestamo]);

    return { cliente, empleado };
};

export default usePrestamo;
