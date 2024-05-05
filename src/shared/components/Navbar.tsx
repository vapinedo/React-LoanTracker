import appFirebase from "@firebaseConfig";
import { getAuth, signOut } from "firebase/auth";

const AUTH = getAuth(appFirebase);

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
            <div className="container-fluid">

                <a className="navbar-brand" href="#">Loan Tracker</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Incio</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#">Usuarios</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#">Empleados</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#">Clientes</a>
                        </li>
                    </ul>

                    <button onClick={() => signOut(AUTH)} className="btn btn-danger">Cerrar Sesión</button>
                </div>
            </div>
        </nav>

    )
}