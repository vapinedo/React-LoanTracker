import useUsers from "@/feature/users/services/useUsers";

export default function HomePage(props: any) {

    const { create } = useUsers();
    
    return (
        <div>
            <p>Home Page {props.userEmail}</p>
            <button onClick={create} className="btn btn-primary">Crear Usuario</button>
        </div>

    )
}