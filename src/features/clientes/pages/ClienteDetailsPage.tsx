import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useClientes from "@services/useClientes";

export default function ClienteDetailsPage() {

    const params = useParams();
    const { getClienteById } = useClientes();
    const [cliente, setCliente] = useState<any>(null)

    useEffect(() => {
        const clienteId = params.id;
        const fetchEmployee = async (clienteId: string) => {
            const newCliente = await getClienteById(clienteId);
            setCliente(newCliente);
        };
        clienteId && fetchEmployee(clienteId);
    }, []);

    return (
        <div>
            <header className="d-flex justify-content-between align-items-center">
                <h2>Detalles del cliente</h2>
            </header>

            <div className="mt-4">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Nombres</th>
                            <td>{cliente?.nombres}</td> 
                        </tr>
                        <tr>
                            <th>Apellidos</th>
                            <td>{cliente?.apellidos}</td> 
                        </tr>
                        <tr>
                            <th>Celular</th>
                            <td>{cliente?.celular}</td> 
                        </tr>
                        <tr>
                            <th>Correo</th>
                            <td>{cliente?.correo}</td> 
                        </tr>
                        <tr>
                            <th>Dirección</th>
                            <td>{cliente?.direccion}</td> 
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}