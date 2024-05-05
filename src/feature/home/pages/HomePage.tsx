import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function HomePage() {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // const { nombres, apellidos, correo, celular, direccion, password, password_confirm } = data;
        console.log({ data });
    };

    return (
        <div>
            <header className='mb-4 d-flex justify-content-between align-items-center'>
                <h2>Crear nuevo usuario</h2>
                <button className="btn btn-outline-danger">Volver Atrás</button>
            </header>

            <Box component="form" noValidate onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-8 mb-3">
                        <TextField fullWidth name="nombres" id="nombres" label="Nombres" size='small' variant="outlined" />
                    </div>

                    <div className="col-md-8 mb-3">
                        <TextField fullWidth name="apellidos" id="apellidos" label="Apellidos" size='small' variant="outlined" />
                    </div>

                    <div className="col-md-8 mb-3">
                        <TextField fullWidth name="correo" id="correo" label="Correo" size='small' variant="outlined" />
                    </div>

                    <div className="col-md-8 mb-3">
                        <TextField fullWidth name="celular" id="celular" label="Celular" size='small' variant="outlined" />
                    </div>

                    <div className="col-md-8 mb-3">
                        <TextField fullWidth name="direccion" id="direccion" label="Dirección" size='small' variant="outlined" />
                    </div>

                    <div className="col-md-8 mb-3">
                        <TextField fullWidth name="password" id="pasword" label="Contraseña" size='small' variant="outlined" />
                    </div>

                    <div className="col-md-8 mb-3">
                        <TextField fullWidth name="password_confirm" id="password_confirm" label="Repetir contraseña" size='small' variant="outlined" />
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Crear usuario
                </Button>
            </Box>
        </div>
    )
}