import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useEmpleados from "@services/useEmpleados";

export default function EmpleadoDetailsPage() {

    const params = useParams();
    const { getEmpleadoById } = useEmpleados();
    const [empleado, setEmpleado] = useState<any>(null)

    useEffect(() => {
        const empleadoId = params.id;
        const fetchEmployee = async (empleadoId: string) => {
            const newEmpleado = await getEmpleadoById(empleadoId);
            setEmpleado(newEmpleado);
        };
        empleadoId && fetchEmployee(empleadoId);
    }, []);

    return (
        <div>
            <header className="d-flex justify-content-between align-items-center">
                <h2>Detalles del empleado</h2>
            </header>

            <div className="mt-4">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Nombres</th>
                            <td>{empleado?.nombres}</td> 
                        </tr>
                        <tr>
                            <th>Apellidos</th>
                            <td>{empleado?.apellidos}</td> 
                        </tr>
                        <tr>
                            <th>Celular</th>
                            <td>{empleado?.celular}</td> 
                        </tr>
                        <tr>
                            <th>Correo</th>
                            <td>{empleado?.correo}</td> 
                        </tr>
                        <tr>
                            <th>Dirección</th>
                            <td>{empleado?.direccion}</td> 
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}