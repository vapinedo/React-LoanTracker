import * as Yup from "yup";
import { useEffect } from "react";
import { Button, Typography } from '@mui/material';
import useClienteStore from "@app/stores/useClienteStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldErrors, useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import { Cliente } from '@features/clientes/models/Cliente';
import CustomTextField from '@components/form/CustomTextField';

const defaultValues: Cliente = {
    id: null,
    nombres: "",
    apellidos: "",
    correo: null,
    celular: "",
    direccion: "",
};

const validationSchema = Yup.object().shape({
    nombres: Yup
        .string()
        .required("Nombres es requerido"),
    apellidos: Yup
        .string()
        .required("Apellidos es requerido"),
    correo: Yup
        .string()
        .notRequired(),
    celular: Yup
        .string()
        .required("Celular es requerido"),
    direccion: Yup
        .string()
        .required("Dirección es requerido"),
});

export default function EmpleadoEditar() {
    const params = useParams();
    const navigate = useNavigate();
    const { getCliente: getClienteById, updateCliente, loading, error } = useClienteStore();

    const form = useForm<Cliente>({
        defaultValues,
        mode: "onTouched",
        resolver: yupResolver(validationSchema),
    });

    const { register, formState, handleSubmit, setValue } = form;
    const { errors, isValid } = formState;

    const onSubmit = async (cliente: Cliente) => {
        await updateCliente(cliente);
        navigate("/clientes");
    };

    const onError = (errors: FieldErrors<any>) => {
        console.log({ errors });
    };

    useEffect(() => {
        const employeeId = params.id;
        if (employeeId) {
            getClienteById(employeeId);
        }
    }, [getClienteById, params.id]);

    useEffect(() => {
        const cliente = useClienteStore.getState().clientes[0];
        if (cliente) {
            setValue("id", cliente.id);
            setValue("nombres", cliente.nombres);
            setValue("apellidos", cliente.apellidos);
            setValue("correo", cliente.correo);
            setValue("celular", cliente.celular);
            setValue("direccion", cliente.direccion);
        }
    }, [useClienteStore.getState().clientes, setValue]);

    return (
        <section>
            <header className='mb-4 d-flex justify-content-between align-items-center'>
                <Typography variant="h4">Editar cliente</Typography>
            </header>

            {loading ? (
                <p>Cargando cliente...</p>
            ) : error ? (
                <p>Error al cargar cliente: {error}</p>
            ) : (
                <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                    <div className="row">
                        <div className="col-md-8 mb-3">
                            <CustomTextField
                                autoFocus
                                type="text"
                                name="nombres"
                                label="Nombres"
                                register={register("nombres")}
                                error={errors.nombres?.message}
                            />
                        </div>

                        <div className="col-md-8 mb-3">
                            <CustomTextField
                                type="text"
                                name="apellidos"
                                label="Apellidos"
                                register={register("apellidos")}
                                error={errors.apellidos?.message}
                            />
                        </div>

                        <div className="col-md-8 mb-3">
                            <CustomTextField
                                type="text"
                                name="correo"
                                label="Correo"
                                register={register("correo")}
                                error={errors.correo?.message}
                            />
                        </div>

                        <div className="col-md-8 mb-3">
                            <CustomTextField
                                type="text"
                                name="celular"
                                label="Celular"
                                register={register("celular")}
                                error={errors.celular?.message}
                            />
                        </div>

                        <div className="col-md-8 mb-3">
                            <CustomTextField
                                type="text"
                                name="direccion"
                                label="Dirección"
                                register={register("direccion")}
                                error={errors.direccion?.message}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        disabled={!isValid || loading}
                        sx={{ marginTop: 2 }}
                    >
                        Guardar
                    </Button>
                </form>
            )}            
        </section>
    );
}
