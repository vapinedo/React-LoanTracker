// import useAuth from "@services/useAuth";
import { Route, Routes } from 'react-router-dom';
import HomePage from "@app/features/home/dashboard/HomePage";
// import LoginPage from "@features/auth/pages/LoginPage";

export default function AuthRouter() {
    // const { isUserLoggedIn } = useAuth();

    // if (isUserLoggedIn) {
    //     return (
    //         <Routes>
    //             <Route path="/" element={<HomePage />} />
    //         </Routes>
    //     )
    // }
    
    return (
        <Routes>
            <Route path="/auth" element={<HomePage />} />
            {/* <Route path="/" element={<LoginPage />} /> */}
        </Routes>
    );
};