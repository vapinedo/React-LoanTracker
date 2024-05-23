import { useEffect, useState } from "react";
import BoxShadow from "@layouts/BoxShadow";
import { useParams } from "react-router-dom";
import useDatetime from "@services/useDatetime";
import usePrestamoStore from "@app/stores/usePrestamoStore";

export default function PrestamoDetailsPage() {

    const params = useParams();
    const { getHumanDate } = useDatetime();
    const { getPrestamo, loading, error } = usePrestamoStore();
    const [prestamo, setPrestamo] = useState<any>(null)

    useEffect(() => {
        const prestamoId = params.id;
        if (prestamoId) {
            const newPrestamo = getPrestamo(prestamoId);
            setPrestamo(newPrestamo);
            console.log({newPrestamo});
        }
    }, [getPrestamo, params.id]);

    return (
        <BoxShadow>
            <header className="d-flex justify-content-between align-items-center">
                <h2>Detalles del prestamo</h2>
            </header>

            {loading ? (
                <p>Cargando prestamo...</p>
            ) : error ? (
                <p>Error al cargar prestamo: {error}</p>
            ) : prestamo ? (
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
            ) : (
                <p>No se encontró prestamo con ID {params.id}</p>
            )}
        </BoxShadow>
    )
}