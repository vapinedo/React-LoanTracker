import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useEmpleadoStore from "@store/useEmpleadoStore";

export default function EmpleadoDetailsPage() {
    const params = useParams();
    const { getEmpleadoById, empleados } = useEmpleadoStore();

    useEffect(() => {
        const empleadoId = params.id;
        if (empleadoId) {
            getEmpleadoById(empleadoId);
        }
    }, [getEmpleadoById, params.id]);

    const empleado = empleados.length > 0 ? empleados[0] : null;

    return (
        <div>
            <header className="d-flex justify-content-between align-items-center">
                <h2>Detalles del empleado</h2>
            </header>

            <div className="mt-4">
                {empleado ? (
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <th>Nombres</th>
                                <td>{empleado.nombres}</td> 
                            </tr>
                            <tr>
                                <th>Apellidos</th>
                                <td>{empleado.apellidos}</td> 
                            </tr>
                            <tr>
                                <th>Celular</th>
                                <td>{empleado.celular}</td> 
                            </tr>
                            <tr>
                                <th>Correo</th>
                                <td>{empleado.correo}</td> 
                            </tr>
                            <tr>
                                <th>Dirección</th>
                                <td>{empleado.direccion}</td> 
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>Cargando empleado...</p>
                )}
            </div>
        </div>
    );
}
