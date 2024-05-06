import { Button } from '@mui/material';
import { FieldErrors, useForm } from 'react-hook-form';
import CustomTextField from '@/shared/formik/CustomTextField';

interface User {
    nombres: string;
    apellidos: string;
    correo: string;
    celular: string;
    direccion: string;
    password: string;
    password_confirm: string;
}

const defaultValues = {
    nombres: "",
    apellidos: "",
    correo: "",
    celular: "",
    direccion: "",
    password: "",
    password_confirm: "",
}

export default function UserNew() {

    const form = useForm<User>({
        defaultValues,
        mode: "onTouched",
        // resolver: yupResolver(validationSchema),
    });
    const { register, formState, handleSubmit } = form;
    const { errors } = formState;

    const onSubmit = (values: any) => {
        console.log({ values });
    };

    const onError = (errors: FieldErrors<any>) => {
        console.log({ errors });
    };

    return (
        <section>
            <header className='mb-4 d-flex justify-content-between align-items-center'>
                <h2>Crear nuevo usuario</h2>
                <button className="btn btn-outline-danger">Volver Atrás</button>
            </header>

            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <div className="row">
                    <div className="col-md-8 mb-3">
                        <CustomTextField
                            autoFocus
                            type="text"
                            name="nombres"
                            label="Nombres"
                            register={register}
                            error={errors.nombres?.message}
                        />
                    </div>

                    <div className="col-md-8 mb-3">
                        <CustomTextField
                            type="text"
                            name="apellidos"
                            label="Apellidos"
                            register={register}
                            error={errors.apellidos?.message}
                        />
                    </div>

                    <div className="col-md-8 mb-3">
                        <CustomTextField
                            type="text"
                            name="correo"
                            label="Correo"
                            register={register}
                            error={errors.correo?.message}
                        />
                    </div>

                    <div className="col-md-8 mb-3">
                        <CustomTextField
                            type="text"
                            name="celular"
                            label="Celular"
                            register={register}
                            error={errors.celular?.message}
                        />
                    </div>

                    <div className="col-md-8 mb-3">
                        <CustomTextField
                            type="text"
                            name="direccion"
                            label="Dirección"
                            register={register}
                            error={errors.direccion?.message}
                        />
                    </div>

                    <div className="col-md-8 mb-3">
                        <CustomTextField
                            type="password"
                            name="password"
                            label="Contraseña"
                            register={register}
                            error={errors.password?.message}
                        />
                    </div>

                    <div className="col-md-8 mb-3">
                        <CustomTextField
                            type="password"
                            name="password_confirm"
                            label="Repetir Contraseña"
                            register={register}
                            error={errors.password_confirm?.message}
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ marginTop: 2 }}
                >
                    Crear usuario
                </Button>
            </form>
        </section>
    )
}