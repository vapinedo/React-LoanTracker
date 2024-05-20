import { Route, Routes } from 'react-router-dom';
import ClienteCrear from "@features/clientes/components/ClienteCrear";
import ClienteEditar from "@features/clientes/components/ClienteEditar";
import ClientesAdminPage from "@features/clientes/pages/ClientesAdminPage";
import ClienteDetailsPage from "@features/clientes/pages/ClienteDetailsPage";

export default function ClientesRouter() {
    return (
        <Routes>
            <Route path="/" element={<ClientesAdminPage />} />
            <Route path="/nuevo" element={<ClienteCrear />} />
            <Route path="/editar/:id" element={<ClienteEditar />} />
            <Route path="/detalles/:id" element={<ClienteDetailsPage />} />
        </Routes>
    )
}