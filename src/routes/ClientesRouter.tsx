import { Route, Routes } from 'react-router-dom';
import ClienteCrear from "@features/clientes/components/ClienteCrear";
import ClienteEditar from "@features/clientes/components/ClienteEditar";
import ClientesAdminPage from "@features/clientes/pages/ClientesAdminPage";
import ClienteDetailsPage from "@features/clientes/pages/ClienteDetailsPage";

export default function ClientesRouter() {
    return (
        <Routes>
            <Route path="/clientes" element={<ClientesAdminPage />} />
            <Route path="/clientes/nuevo" element={<ClienteCrear />} />
            <Route path="/clientes/editar/:id" element={<ClienteEditar />} />
            <Route path="/clientes/detalles/:id" element={<ClienteDetailsPage />} />
        </Routes>
    )
}