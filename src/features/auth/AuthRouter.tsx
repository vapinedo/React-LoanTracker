import useAuth from "@services/useAuth";
import { Route } from 'react-router-dom';
import HomePage from "@features/home/pages/HomePage";
import LoginPage from "@features/auth/pages/LoginPage";

export default function AuthRouter() {
    const { isUserLoggedIn } = useAuth();

    if (isUserLoggedIn) {
        return <Route path="/" element={<HomePage />} />
    }

    return <Route path="/" element={<LoginPage />} />
};