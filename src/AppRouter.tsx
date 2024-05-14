import React from "react";
import Navbar from "@components/Navbar";
import useAuth from "@services/useAuth";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from 'react-router-dom'
import Breadcrumbs from "@components/Breadcrumbs";
import NotFoundPage from '@components/NotFoundPage';
import HomePage from "@features/home/pages/HomePage";
import LoginPage from "@features/auth/pages/LoginPage";
import ClienteCrear from "@features/clientes/components/ClienteCrear";
import UsuarioCrear from "@features/usuarios/components/UsuarioCrear";
import ClienteEditar from "@features/clientes/components/ClienteEditar";
import PrestamoCrear from "@features/prestamos/components/PrestamoCrear";
import EmpleadoCrear from "@features/empleados/components/EmpleadoCrear";
import PrestamoEditar from "@features/prestamos/components/PrestamoEditar";
import UsuariosAdminPage from "@features/usuarios/pages/UsuariosAdminPage";
import ClientesAdminPage from "@features/clientes/pages/ClientesAdminPage";
import EmpleadoEditar from "@features/empleados/components/EmpleadoEditar";
import PrestamosAdminPage from "@features/prestamos/pages/PrestamoAdminPage";
import ClienteDetailsPage from "@features/clientes/pages/ClienteDetailsPage";
import EmpleadosAdminPage from "@features/empleados/pages/EmpleadosAdminPage";
import EmpleadoDetailsPage from "@features/empleados/pages/EmpleadoDetailsPage";
import PrestamoDetailsPage from "@features/prestamos/pages/PrestamoDetailsPage";

export default function AppRouter() {

    const { isUserLoggedIn } = useAuth();

    return (
        <React.Fragment>
            <Navbar />

            <section className="container-fluid mt-4 mb-5 px-5">
                <Toaster />
                <Breadcrumbs />
                <Routes>
                    {
                        isUserLoggedIn
                        ? <Route path="/" element={ <HomePage /> } />
                        : <Route path="/" element={ <LoginPage /> } />
                    }
                    
                    <Route path="/usuarios" element={ <UsuariosAdminPage /> } />
                    <Route path="/usuarios/nuevo" element={ <UsuarioCrear /> } />

                    <Route path="/clientes" element={ <ClientesAdminPage /> } />
                    <Route path="/clientes/nuevo" element={ <ClienteCrear /> } />
                    <Route path="/clientes/detalles/:id" element={ <ClienteDetailsPage /> } />
                    <Route path="/clientes/editar/:id" element={ <ClienteEditar /> } />

                    <Route path="/empleados" element={ <EmpleadosAdminPage /> } />
                    <Route path="/empleados/nuevo" element={ <EmpleadoCrear /> } />
                    <Route path="/empleados/detalles/:id" element={ <EmpleadoDetailsPage /> } />
                    <Route path="/empleados/editar/:id" element={ <EmpleadoEditar /> } />

                    <Route path="/prestamos" element={ <PrestamosAdminPage /> } />
                    <Route path="/prestamos/nuevo" element={ <PrestamoCrear /> } />
                    <Route path="/prestamos/detalles/:id" element={ <PrestamoDetailsPage /> } />
                    <Route path="/prestamos/editar/:id" element={ <PrestamoEditar /> } />

                    <Route path="*" element={ <NotFoundPage /> } />
                </Routes>
            </section>
        </React.Fragment>
    )
}