import { Route } from 'react-router-dom';
import EmpleadoCrear from "@features/empleados/components/EmpleadoCrear";
import EmpleadoEditar from "@features/empleados/components/EmpleadoEditar";
import EmpleadosAdminPage from "@features/empleados/pages/EmpleadosAdminPage";
import EmpleadoDetailsPage from "@features/empleados/pages/EmpleadoDetailsPage";

export default function EmpleadosRouter() {
    return (
        <>
            <Route path="/empleados" element={ <EmpleadosAdminPage /> } />
            <Route path="/empleados/nuevo" element={ <EmpleadoCrear /> } />
            <Route path="/empleados/editar/:id" element={ <EmpleadoEditar /> } />
            <Route path="/empleados/detalles/:id" element={ <EmpleadoDetailsPage /> } />
        </>
    )
}