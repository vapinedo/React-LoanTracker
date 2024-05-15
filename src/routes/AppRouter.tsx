import React from "react";
import Navbar from "@components/Navbar";
import useAuth from "@services/useAuth";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from 'react-router-dom'
import Breadcrumbs from "@components/Breadcrumbs";
import NotFoundPage from '@components/NotFoundPage';
import EmpleadosRouter from "@routes/EmpleadosRouter";
import LoginPage from "@features/auth/pages/LoginPage";

export default function AppRouter() {


    const { user } = useAuth();
    
    return (
        <React.Fragment>
            {user && <Navbar />}

            <section className="container-fluid mt-4 mb-5 px-5">
                <Toaster />
                <Breadcrumbs />
                <Routes>
                    <Route path="/" element={ <LoginPage /> } />
                    <Route path="/empleados/*" element={ <EmpleadosRouter /> } />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </section>
        </React.Fragment>
    )
}