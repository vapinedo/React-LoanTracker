import { Route } from 'react-router-dom';
import PrestamoCrear from "@features/prestamos/components/PrestamoCrear";
import PrestamoEditar from "@features/prestamos/components/PrestamoEditar";
import PrestamosAdminPage from "@features/prestamos/pages/PrestamoAdminPage";
import PrestamoDetailsPage from "@features/prestamos/pages/PrestamoDetailsPage";

export default function PrestamosRouter() {
    return (
        <>
            <Route path="/prestamos" element={<PrestamosAdminPage />} />
            <Route path="/prestamos/nuevo" element={<PrestamoCrear />} />
            <Route path="/prestamos/editar/:id" element={<PrestamoEditar />} />
            <Route path="/prestamos/detalles/:id" element={<PrestamoDetailsPage />} />
        </>
    )
}
