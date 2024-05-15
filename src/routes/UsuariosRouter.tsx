import { Route, Routes } from 'react-router-dom';
import UsuarioCrear from '@features/usuarios/components/UsuarioCrear';
import UsusariosAdminPage from '@features/usuarios/pages/UsuariosAdminPage';

export default function UsuariosRouter() {
    return (
        <Routes>
            <Route path="/" element={<UsusariosAdminPage />} />
            <Route path="/nuevo" element={<UsuarioCrear />} />
        </Routes>
    )
}
