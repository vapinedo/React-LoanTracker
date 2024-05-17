import * as Yup from "yup";
import useAuth from "@services/useAuth";
import { Auth } from "@features/auth/models/Auth";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldErrors, useForm } from 'react-hook-form';
import CustomTextField from "@components/form/CustomTextField";
import { Box, Button, Container, CssBaseline, Grid, Typography } from "@mui/material";

const defaultValues: Auth = {
    email: "",
    password: ""
};

const validationSchema = Yup.object().shape({
    email: Yup
        .string()
        .email('Correo inválido')
        .required('Correo es requerido'),
    password: Yup
        .string()
        .required("Contraseña es requerido"),
});

export default function LoginPage() {

    const { signIn } = useAuth();
    const navigate = useNavigate();

    const form = useForm<Auth>({
        defaultValues,
        mode: "onTouched",
        resolver: yupResolver(validationSchema),
    });

    const { register, formState, handleSubmit } = form;
    const { errors, isValid, isSubmitting } = formState;

    const onSubmit = (loginData: Auth) => {
        const { email, password } = loginData;
        if (email !== null && password != null) {
            signIn(email, password);
            navigate("/empleados");
        }
    };

    const onError = (errors: FieldErrors<any>) => {
        console.log({ errors });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Typography component="h1" variant="h5">
                    Iniciar Sesión
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit, onError)} sx={{ mt: 3 }} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CustomTextField
                                autoFocus
                                type="text"
                                name="email"
                                label="Correo"
                                register={register("email")}
                                error={errors.email?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <CustomTextField
                                type="password"
                                name="password"
                                label="Contraseña"
                                register={register("password")}
                                error={errors.password?.message}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!isValid || isSubmitting}
                    >
                        Acceder
                    </Button>

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/">
                                Olvidé mi contraseña
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}