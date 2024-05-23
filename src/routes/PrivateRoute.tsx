import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthService from "@services/useAuthService";
import LoginPage from "@features/auth/pages/LoginPage";

const PrivateRoute = ({ Component }) => {
    const navigate = useNavigate();
    const { user } = useAuthService();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (user !== null) {
            setIsAuthenticated(true);
            if (!user) {
                navigate("/login");
            }
        }
    }, [user, navigate]);

    if (isAuthenticated === false) {
        return <LoginPage />;
    }

    return isAuthenticated ? <Component /> : null;
};

export default PrivateRoute;
