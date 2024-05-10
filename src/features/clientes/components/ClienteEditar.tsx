import * as Yup from "yup";
import { useEffect } from "react";
import { Button } from '@mui/material';
import useClientes from "@services/useClientes";
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

export default function ClienteEditar() {

    const params = useParams();
    const navigate = useNavigate();
    const { getClienteById, updateCliente } = useClientes();

    const form = useForm<Cliente>({
        defaultValues,
        mode: "onTouched",
        resolver: yupResolver(validationSchema),
    });

    const { register, formState, handleSubmit } = form;
    const { errors, isSubmitting, isValid } = formState;

    const onSubmit = (cliente: Cliente) => {
        updateCliente(cliente);
        navigate("/clientes");
    };

    const onError = (errors: FieldErrors<any>) => {
        console.log({ errors });
    };

    useEffect(() => {
        const employeeId = params.id;
        const fetchEmployee = async (employeeId: string) => {
            const cliente = await getClienteById(employeeId);
            form.setValue("id", cliente?.id);
            form.setValue("nombres", cliente?.nombres);
            form.setValue("apellidos", cliente?.apellidos);
            form.setValue("correo", cliente?.correo);
            form.setValue("celular", cliente?.celular);
            form.setValue("direccion", cliente?.direccion);
        }
        employeeId && fetchEmployee(employeeId);
    }, [params.id])

    return (
        <section>
            <header className='mb-4 d-flex justify-content-between align-items-center'>
                <h2>Editar cliente</h2>
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
                </div>

                <Button
                    type="submit"
                    color="success"
                    variant="contained"
                    sx={{ marginTop: 2 }}
                    // disabled={!isValid || isSubmitting}
                >
                    Guardar
                </Button>
            </form>
        </section>
    )
}