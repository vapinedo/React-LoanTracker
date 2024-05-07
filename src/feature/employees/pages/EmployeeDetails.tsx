import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useEmployee from "@feature/employees/services/useEmployee";

export default function EmployeeDetails() {

    const params = useParams();
    const { getEmployeeById } = useEmployee();
    const [employee, setEmployee] = useState<any>(null)

    useEffect(() => {
        const employeeId = params.id;
        const fetchEmployee = async (employeeId: string) => {
            const newEmployee = await getEmployeeById(employeeId);
            setEmployee(newEmployee);
        };
        employeeId && fetchEmployee(employeeId);
    }, []);

    return (
        <div>
            <header className="d-flex justify-content-between align-items-center">
                <h2>Detalles del empleado</h2>
                <button className="btn btn-outline-danger">Volver Atrás</button>
            </header>

            <div className="mt-4">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Nombres</th>
                            <td>{employee?.nombres}</td> 
                        </tr>
                        <tr>
                            <th>Apellidos</th>
                            <td>{employee?.apellidos}</td> 
                        </tr>
                        <tr>
                            <th>Celular</th>
                            <td>{employee?.celular}</td> 
                        </tr>
                        <tr>
                            <th>Correo</th>
                            <td>{employee?.correo}</td> 
                        </tr>
                        <tr>
                            <th>Dirección</th>
                            <td>{employee?.direccion}</td> 
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}