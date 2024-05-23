import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@services/useAuth";

const PrivateRoute = ({ Component }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (user !== null) {
            setIsAuthenticated(true);
            if (!user) {
                navigate("/");
            }
        }
    }, [user, navigate]);

    if (isAuthenticated === false) {
        // Mostrar un indicador de carga u otra lógica mientras se verifica el estado de autenticación
        return null;
    }

    return isAuthenticated ? <Component /> : null;
};

export default PrivateRoute;
