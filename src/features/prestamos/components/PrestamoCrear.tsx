// import * as Yup from "yup";
import Select from '@mui/material/Select';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useClientes from "@services/useClientes";
import useEmpleados from "@services/useEmpleados";
import Autocomplete from '@mui/material/Autocomplete';
// import { yupResolver } from "@hookform/resolvers/yup";
import { FieldErrors, useForm } from 'react-hook-form';
import { Prestamo } from '@features/prestamos/models/Prestamo';
import CustomTextField from '@components/form/CustomTextField';
import { AutocompleteOption } from "@models/AutocompleteOption";
import { Button, FormControl, InputLabel, MenuItem, TextField } from '@mui/material';
import { estadoPrestamoOptions, modalidadDePagoOptions } from '@app/mocks/DropdownOptions';

const defaultValues: Prestamo = {
    id: null,
    clienteId: null,
    empleadoId: null,
    monto: 0,
    interes: 0,
    fechaInicio: new Date(),
    fechaFinal: new Date(),
    estado: "Activo",
    modalidadDePago: "Diario",
}

// const validationSchema = Yup.object().shape({
//     clienteId: Yup
//         .string()
//         .required("Cliente es requerido"),
//     empleadoId: Yup
//         .string()
//         .required("Empleado es requerido"),
//     monto: Yup
//         .number()
//         .required("Monto es requerido"),
//     interes: Yup
//         .number()
//         .required("Interés es requerido"),
// });

// const clienteOptions = [
//     { label: "Juan Perez", value: "1"}, 
//     { label: "Maria Gomez", value: "2"}, 
//     { label: "Diego Sandoval", value: "3"}, 
// ];

export default function PrestamoCrear() {

    const navigate = useNavigate();
    const { getClienteOptions } = useClientes();
    const { getEmpleadoOptions } = useEmpleados();
    const [clienteOptions, setClienteOptions] = useState<AutocompleteOption[] | []>([]);
    const [empleadoOptions, setEmpleadoOptions] = useState<AutocompleteOption[] | []>([]);

    const form = useForm<Prestamo>({
        defaultValues,
        mode: "onTouched",
        // resolver: yupResolver(validationSchema),
    });

    const { register, formState, handleSubmit } = form;
    const { errors, isSubmitting, isValid } = formState;

    const onSubmit = (prestamo: Prestamo) => {
        console.log({ prestamo });
        // createPrestamo(prestamo);
        // navigate("/prestamos");
    };

    const onError = (errors: FieldErrors<any>) => {
        console.log({ errors });
    };

    useEffect(() => {
        const fetchClienteOptions = async () => {
            const clienteOptions = await getClienteOptions();
            setClienteOptions(clienteOptions);
        };
        fetchClienteOptions();
    }, []);

    useEffect(() => {
        const fetchEmpleadoOptions = async () => {
            const empleadOptions = await getEmpleadoOptions();
            setEmpleadoOptions(empleadOptions);
        };
        fetchEmpleadoOptions();
    }, []);

    return (
        <section>
            <header className='mb-4 d-flex justify-content-between align-items-center'>
                <h2>Nuevo prestamo</h2>
                <button className="btn btn-outline-danger">Volver Atrás</button>
            </header>

            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <div className="row">
                    <div className="col-md-8 mb-3">
                        <Autocomplete
                            fullWidth
                            size="small"
                            options={clienteOptions}
                            onChange={(event: any, option: AutocompleteOption) => {
                                form.setValue("clienteId", option.value);
                            }}
                            renderInput={(params) => <TextField {...params} label="Cliente" />}
                        />
                    </div>

                    <div className="col-md-8 mb-3">
                        <Autocomplete
                            fullWidth
                            size="small"
                            options={empleadoOptions}
                            onChange={(event: any, option: AutocompleteOption) => {
                                form.setValue("empleadoId", option.value);
                            }}
                            renderInput={(params) => <TextField {...params} name="empleadoId" label="Empleado" />}
                        />
                    </div>

                    <div className="col-md-8 mb-3">
                        <CustomTextField
                            type="text"
                            name="monto"
                            label="Monto"
                            register={register}
                            error={errors.monto?.message}
                        />
                    </div>

                    <div className="col-md-8 mb-3">
                        <CustomTextField
                            type="text"
                            name="interes"
                            label="Interés"
                            register={register}
                            error={errors.interes?.message}
                        />
                    </div>

                    <div className="col-md-8 mb-3">
                        <FormControl fullWidth>
                            <InputLabel>Modalidad de pago</InputLabel>
                            <Select
                                defaultValue="Diario"
                                name="modalidadDePago"
                                onChange={(event) => {
                                    const value = event?.target.value;
                                    form.setValue("modalidadDePago", value);
                                }}
                            >
                                {modalidadDePagoOptions.map((modalidad: string) => (
                                    <MenuItem key={modalidad} value={modalidad}>{modalidad}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="col-md-8 mb-3">
                        <FormControl fullWidth>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                defaultValue="Activo"
                                name="estado"
                                onChange={(event) => {
                                    const value = event?.target.value;
                                    form.setValue("estado", value);
                                }}
                            >
                                {estadoPrestamoOptions.map((estado: string) => (
                                    <MenuItem key={estado} value={estado}>{estado}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ marginTop: 2 }}
                    disabled={!isValid || isSubmitting}
                >
                    Guardar
                </Button>
            </form>
        </section>
    )
}