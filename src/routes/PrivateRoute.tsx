import useAuth from "@services/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
    const { user } = useAuth();

    return user ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;
