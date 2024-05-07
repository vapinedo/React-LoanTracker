import React from "react";
import Navbar from "@components/Navbar";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from 'react-router-dom'
import Breadcrumbs from "@components/Breadcrumbs";
import NotFoundPage from '@components/NotFoundPage';
import HomePage from "@features/home/pages/HomePage";
import UsuarioCrear from "@features/usuarios/components/UsuarioCrear";
import EmpleadoCrear from "@features/empleados/components/EmpleadoCrear";
import EmpleadoEditar from "@features/empleados/components/EmpleadoEditar";
import UsuariosAdminPage from "@features/usuarios/pages/UsuariosAdminPage";
import ClientesAdminPage from "@features/clientes/pages/ClientesAdminPage";
import EmpleadosAdminPage from "@features/empleados/pages/EmpleadosAdminPage";
import EmpleadoDetailsPage from "@features/empleados/pages/EmpleadoDetailsPage";

export default function AppRouter() {
    return (
        <React.Fragment>
            <Navbar />

            <section className="container mt-4 mb-5">
                <Toaster />
                <Breadcrumbs />
                <Routes>
                    <Route path="/" element={ <HomePage /> } />
                    <Route path="/usuarios" element={ <UsuariosAdminPage /> } />
                    <Route path="/usuarios/nuevo" element={ <UsuarioCrear /> } />
                    <Route path="/clientes" element={ <ClientesAdminPage /> } />
                    <Route path="/empleados" element={ <EmpleadosAdminPage /> } />
                    <Route path="/empleados/nuevo" element={ <EmpleadoCrear /> } />
                    <Route path="/empleados/detalles/:id" element={ <EmpleadoDetailsPage /> } />
                    <Route path="/empleados/editar/:id" element={ <EmpleadoEditar /> } />
                    <Route path="*" element={ <NotFoundPage /> } />
                </Routes>
            </section>
        </React.Fragment>
    )
}