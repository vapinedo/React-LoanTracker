import { useEffect } from "react";
import BoxShadow from "@layouts/BoxShadow";
import { useParams } from "react-router-dom";
import useClienteStore from "@stores/useClienteStore";

export default function EmpleadoDetailsPage() {
    const params = useParams();
    const { getCliente, clientes, loading, error } = useClienteStore();

    useEffect(() => {
        const clienteId = params.id;
        if (clienteId) {
            getCliente(clienteId);
        }
    }, [getCliente, params.id]);

    const cliente = clientes.length > 0 ? clientes[0] : null;

    return (
        <BoxShadow>
            <header className="d-flex justify-content-between align-items-center">
                <h2>Detalles del cliente</h2>
            </header>

            {loading ? (
                <p>Cargando cliente...</p>
            ) : error ? (
                <p>Error al cargar cliente: {error}</p>
            ) : cliente ? (
                <div className="mt-4">
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <th>Nombres</th>
                                <td>{cliente.nombres}</td>
                            </tr>
                            <tr>
                                <th>Apellidos</th>
                                <td>{cliente.apellidos}</td>
                            </tr>
                            <tr>
                                <th>Celular</th>
                                <td>{cliente.celular}</td>
                            </tr>
                            <tr>
                                <th>Correo</th>
                                <td>{cliente.correo}</td>
                            </tr>
                            <tr>
                                <th>Dirección</th>
                                <td>{cliente.direccion}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No se encontró cliente con ID {params.id}</p>
            )}
        </BoxShadow>
    );
}
