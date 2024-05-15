import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePrestamos from "@services/usePrestamos";
import useDatetime from "@app/services/useDatetime";

export default function PrestamoDetailsPage() {

    const params = useParams();
    const { getHumanDate } = useDatetime();
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

    if (!prestamo) {
        return <p>Cargando...</p>
    }

    return (
        <div>
            <header className="d-flex justify-content-between align-items-center">
                <h2>Detalles del prestamo</h2>
            </header>

            <div className="mt-4">
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <th>Cliente</th>
                                    <td>{prestamo?.clienteNombre}</td>
                                </tr>
                                <tr>
                                    <th>Responsable</th>
                                    <td>{prestamo?.empleadoNombre}</td>
                                </tr>
                                <tr>
                                    <th>Valor</th>
                                    <td>{prestamo?.monto}</td>
                                </tr>
                                <tr>
                                    <th>Interés</th>
                                    <td>{prestamo?.interes}</td>
                                </tr>
                                <tr>
                                    <th>Estado</th>
                                    <td>{prestamo?.estado}</td>
                                </tr>
                                <tr>
                                    <th>Modo de pago</th>
                                    <td>{prestamo?.modalidadDePago}</td>
                                </tr>
                                <tr>
                                    <th>Fecha inicial</th>
                                    <td>{getHumanDate(prestamo?.fechaInicio)}</td>
                                </tr>
                                <tr>
                                    <th>Fecha límite</th>
                                    <td>{getHumanDate(prestamo?.fechaFinal)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}