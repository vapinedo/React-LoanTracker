import useAuth from "@services/useAuth";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const logoutResponse = await logout();
        if (logoutResponse === undefined) {
            navigate("/login");
        }
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
                            <NavLink className="nav-link" aria-current="page" to="/">Inicio</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/empleados">Empleados</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/clientes">Clientes</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/prestamos">Prestamos</NavLink>
                        </li>
                    </ul>

                    {user && <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>}
                </div>
            </div>
        </nav>

    )
}