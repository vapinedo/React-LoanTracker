import { useNavigate } from "react-router-dom"

export default function EmployeeAdminPage() {

  const navigate = useNavigate();
  
  return (
    <div>
      <header className="d-flex justify-content-between align-items-center">
        <h2>Listado de Empleados</h2>
        <button onClick={() => navigate("/empleados/nuevo")} className="btn btn-primary">Crear empleado</button>
      </header>
    </div>
  )
}