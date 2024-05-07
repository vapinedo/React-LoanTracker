import useUsuarios from "@services/useUsuarios"
import { NavLink } from "react-router-dom";

export default function Navbar() {

    const { logout } = useUsuarios();

    const handleLogout = () => {
        logout();
    }
    
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
            <div className="container-fluid">

                <NavLink className="navbar-brand" to="/">Loan Tracker</NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/">Inicio</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/usuarios">Usuarios</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/empleados">Empleados</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/clientes">Clientes</NavLink>
                        </li>
                    </ul>

                    <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
                </div>
            </div>
        </nav>

    )
}