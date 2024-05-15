import { Route } from 'react-router-dom';
import UsuarioCrear from '@features/usuarios/components/UsuarioCrear';
import UsusariosAdminPage from '@features/usuarios/pages/UsuariosAdminPage';

export default function UsuariosRouter() {
    return (
        <>
            <Route path="/prestamos" element={<UsusariosAdminPage />} />
            <Route path="/prestamos/nuevo" element={<UsuarioCrear />} />
        </>
    )
}
