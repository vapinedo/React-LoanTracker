import { Route, Routes } from 'react-router-dom';
import EmpleadoCrear from "@features/empleados/components/EmpleadoCrear";
import EmpleadoEditar from "@features/empleados/components/EmpleadoEditar";
import EmpleadosAdminPage from "@features/empleados/pages/EmpleadosAdminPage";
import EmpleadoDetailsPage from "@features/empleados/pages/EmpleadoDetailsPage";

export default function EmpleadosRouter() {
    return (
        <Routes>
            <Route path="/" element={ <EmpleadosAdminPage /> } />
            <Route path="/nuevo" element={ <EmpleadoCrear /> } />
            <Route path="/editar/:id" element={ <EmpleadoEditar /> } />
            <Route path="/detalles/:id" element={ <EmpleadoDetailsPage /> } />
        </Routes>
    )
}