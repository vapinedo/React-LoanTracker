import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import appFirebase from "@firebaseConfig";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Box from '@mui/material/Box';

const AUTH = getAuth(appFirebase);

export default function LoginPage() {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const authData = {
      email: data.get("email"),
      password: data.get("password")
    }
    loginToFirebase(authData);
  };

  const loginToFirebase = async ({ email, password }: any) => {
    try {
      await signInWithEmailAndPassword(AUTH, email, password);
    } catch (error) {
      alert("El correo o contraseña son incorrectos");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Mantener sesión"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Acceder
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Olvidé mi contraseña
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}