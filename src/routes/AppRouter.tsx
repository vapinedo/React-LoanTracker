import React from "react";
import Navbar from "@components/Navbar";
import { Toaster } from "react-hot-toast";
import AuthRouter from "@routes/AuthRouter";
import { Route, Routes } from 'react-router-dom'
import Breadcrumbs from "@components/Breadcrumbs";
import NotFoundPage from '@components/NotFoundPage';
import EmpleadosRouter from "@routes/EmpleadosRouter";

export default function AppRouter() {
    return (
        <React.Fragment>
            <Navbar />

            <section className="container-fluid mt-4 mb-5 px-5">
                <Toaster />
                <Breadcrumbs />
                <Routes>
                    <Route path="*" element={ <AuthRouter /> } />
                    <Route path="/empleados/*" element={ <EmpleadosRouter /> } />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </section>
        </React.Fragment>
    )
}