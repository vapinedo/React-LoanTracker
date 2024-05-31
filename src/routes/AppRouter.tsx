import Navbar from "@components/Navbar";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Breadcrumbs from "@components/Breadcrumbs";
import React, { useEffect, useState } from "react";
import NotFoundPage from "@components/NotFoundPage";
import PrivateRoute from "@app/routes/PrivateRoute";
import useAuthService from "@services/useAuthService";
import LoginPage from "@features/auth/pages/LoginPage";
import ClientesRouter from "@features/clientes/ClientesRouter";
import PrestamosRouter from "@features/prestamos/PrestamosRouter";
import EmpleadosRouter from "@features/empleados/EmpleadosRouter";
import DashboardPage from "@features/dashboard/pages/DashboardPage";

export default function AppRouter() {
    const { user } = useAuthService();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        setIsAuthChecked(true);
    }, [user]);

    return (
        <React.Fragment>
            {isAuthChecked && user && <Navbar /> }

            <section className="container-fluid mt-5 mb-5 px-5">
                {isAuthChecked && user && <Toaster />}
                {isAuthChecked && user &&  <Breadcrumbs />}
                
                <Routes>
                    {/* public routes */}
                    <Route path="/login" element={<LoginPage />} />
                    
                    {/* private routes */}
                    <Route path="/" element={<PrivateRoute Component={DashboardPage} />} />
                    <Route path="/clientes/*" element={<PrivateRoute Component={ClientesRouter} />} />
                    <Route path="/empleados/*" element={<PrivateRoute Component={EmpleadosRouter} />} />
                    <Route path="/prestamos/*" element={<PrivateRoute Component={PrestamosRouter} />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </section>
        </React.Fragment>
    );
}
