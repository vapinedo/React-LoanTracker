import { Route, Routes } from 'react-router-dom';
import PrestamoCrear from "@features/prestamos/components/PrestamoCrear";
import PrestamoEditar from "@features/prestamos/components/PrestamoEditar";
import PrestamosAdminPage from "@features/prestamos/pages/PrestamoAdminPage";
import PrestamoDetailsPage from "@features/prestamos/pages/PrestamoDetailsPage";

export default function PrestamosRouter() {
    return (
        <Routes>
            <Route path="/" element={<PrestamosAdminPage />} />
            <Route path="/nuevo" element={<PrestamoCrear />} />
            <Route path="/editar/:id" element={<PrestamoEditar />} />
            <Route path="/detalles/:id" element={<PrestamoDetailsPage />} />
        </Routes>
    )
}
