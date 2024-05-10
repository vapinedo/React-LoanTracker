import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePrestamos from "@services/usePrestamos";

export default function PrestamoDetailsPage() {

    const params = useParams();
    const { getPrestamoById } = usePrestamos();
    const [prestamo, setPrestamo] = useState<any>(null)

    useEffect(() => {
        const prestamoId = params.id;
        const fetchPrestamo = async (prestamoId: string) => {
            const newPrestamo = await getPrestamoById(prestamoId);
            setPrestamo(newPrestamo);
        };
        prestamoId && fetchPrestamo(prestamoId);
    }, []);

    return (
        <div>
            <header className="d-flex justify-content-between align-items-center">
                <h2>Detalles del prestamo</h2>
                <button className="btn btn-outline-danger">Volver Atrás</button>
            </header>

            <div className="mt-4">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Nombres</th>
                            <td>{prestamo?.nombres}</td> 
                        </tr>
                        <tr>
                            <th>Apellidos</th>
                            <td>{prestamo?.apellidos}</td> 
                        </tr>
                        <tr>
                            <th>Celular</th>
                            <td>{prestamo?.celular}</td> 
                        </tr>
                        <tr>
                            <th>Correo</th>
                            <td>{prestamo?.correo}</td> 
                        </tr>
                        <tr>
                            <th>Dirección</th>
                            <td>{prestamo?.direccion}</td> 
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}