import { useNavigate } from "react-router-dom"

export default function UserAdminPage() {

    const navigate = useNavigate();

    return (
        <section>
            <header className="d-flex justify-content-between align-items-center">
                <h2>Lista de Usuarios</h2>
                <button onClick={() => navigate("/usuarios/nuevo")} className="btn btn-primary">Crear nuevo usuario</button>
            </header>
        </section>
    )
}