import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Employee } from "@feature/employees/models/Employee";
import useEmployee from "@feature/employees/services/useEmployee";

export default function EmployeeAdminPage() {

  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[] | []>([]);
  const { getAllEmployees } = useEmployee();

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeeList = await getAllEmployees();
      setEmployees(employeeList);
    };
    fetchEmployees();
  }, []);

  return (
    <div>
      <header className="d-flex justify-content-between align-items-center">
        <h2>Lista de Empleados</h2>
        <button onClick={() => navigate("/empleados/nuevo")} className="btn btn-primary">Crear empleado</button>
      </header>

      <div>
        {employees.map((employee: Employee) => (
          <div key={employee.uuid}>{employee.nombres}</div>
        ))}
      </div>
    </div>
  )
}