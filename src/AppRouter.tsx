import React from "react";
import Navbar from "@shared/components/Navbar";
import { Route, Routes } from 'react-router-dom'
import HomePage from "@feature/home/pages/HomePage";
import UserNew from "@feature/users/components/UserNew";
import NotFoundPage from '@shared/components/NotFoundPage';
import UserAdminPage from "@feature/users/pages/UserAdminPage";
import CustomerAdminPage from "@feature/customers/pages/CustomerAdminPage";
import EmployeeAdminPage from "@feature/employees/pages/EmployeeAdminPage";

// const APP_ROUTER = createBrowserRouter([
//     {
//         path: "/",
//         element: <HomePage />,
//         errorElement: <NotFoundPage />
//     },
//     {
//         path: "/usuarios/*",
//         element: <UserRouter />,
//     },
//     {
//         path: "/user-profiles",
//         element: <UserProfilesPage />,
//         children: [
//             {
//                 path: "/user-profiles/:profileId",
//                 element: <UserProfilePage />
//             }
//         ]
//     }
// ]);

export default function AppRouter() {
    return (
        <React.Fragment>
            <Navbar />

            <section className="container mt-4">
                <Routes>
                    <Route path="/" element={ <HomePage /> } />
                    <Route path="/usuarios" element={ <UserAdminPage /> } />
                    <Route path="/usuarios/nuevo" element={ <UserNew /> } />
                    <Route path="/clientes" element={ <CustomerAdminPage /> } />
                    <Route path="/empleados" element={ <EmployeeAdminPage /> } />
                    <Route path="*" element={ <NotFoundPage /> } />
                </Routes>
            </section>
        </React.Fragment>
    )
}