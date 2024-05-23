import React, { useEffect, useState } from "react";
import Navbar from "@components/Navbar";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Breadcrumbs from "@components/Breadcrumbs";
import PrivateRoute from "@app/routes/PrivateRoute";
import NotFoundPage from "@components/NotFoundPage";
import HomePage from "@features/home/pages/HomePage";
import useAuthService from "@services/useAuthService";
import LoginPage from "@features/auth/pages/LoginPage";
import ClientesRouter from "@app/features/clientes/ClientesRouter";
import PrestamosRouter from "@app/features/prestamos/PrestamosRouter";
import EmpleadosRouter from "@app/features/empleados/EmpleadosRouter";

export default function AppRouter() {
    const { user } = useAuthService();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        setIsAuthChecked(true);
    }, [user]);

    return (
        <React.Fragment>
            {isAuthChecked && user && <Navbar /> }

            <section className="container mt-4 mb-5 px-5">
                {isAuthChecked && user && <Toaster />}
                {isAuthChecked && user &&  <Breadcrumbs />}
                
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    
                    <Route path="/" element={<PrivateRoute Component={HomePage} />} />
                    <Route path="/clientes/*" element={<PrivateRoute Component={ClientesRouter} />} />
                    <Route path="/empleados/*" element={<PrivateRoute Component={EmpleadosRouter} />} />
                    <Route path="/prestamos/*" element={<PrivateRoute Component={PrestamosRouter} />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </section>
        </React.Fragment>
    );
}
