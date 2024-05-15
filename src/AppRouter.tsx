import React from "react";
import Navbar from "@components/Navbar";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from 'react-router-dom'
import Breadcrumbs from "@components/Breadcrumbs";
import AuthRouter from "@features/auth/AuthRouter";
import NotFoundPage from '@components/NotFoundPage';
import ClientesRouter from "@features/clientes/ClientesRouter";
import UsuariosRouter from "@features/usuarios/UsuariosRouter";
import EmpleadosRouter from "@features/empleados/EmpleadosRouter";
import PrestamosRouter from "@features/prestamos/PrestamosRouter";

export default function AppRouter() {
    return (
        <React.Fragment>
            <Navbar />

            <section className="container-fluid mt-4 mb-5 px-5">
                <Toaster />
                <Breadcrumbs />
                <Routes>
                    <AuthRouter />
                    <ClientesRouter />
                    <EmpleadosRouter />
                    <PrestamosRouter />
                    <UsuariosRouter />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </section>
        </React.Fragment>
    )
}