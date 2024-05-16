import dayjs from 'dayjs';
import db from '@firebaseConfig';
import { useEffect } from 'react';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import { doc, Firestore } from 'firebase/firestore';
import useClienteStore from '@stores/useClienteStore';
import { FieldErrors, useForm } from 'react-hook-form';
import usePrestamoStore from '@stores/usePrestamoStore';
import { Cliente } from '@features/clientes/models/Cliente';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Prestamo } from '@features/prestamos/models/Prestamo';
import CustomTextField from '@components/form/CustomTextField';
import { estadoPrestamoOptions, modalidadDePagoOptions } from '@mocks/DropdownOptions';
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, TextField } from '@mui/material';

const defaultValues: Prestamo = {
    id: null,
    monto: 0,
    interes: 0,
    fechaInicio: new Date().getTime(),
    fechaFinal: new Date().getTime(),
    estado: "Activo",
    modalidadDePago: "Diario",
    clienteRef: null,
    empleadoRef: null,
}

export default function PrestamoCrear() {
    const navigate = useNavigate();
    const { createPrestamo } = usePrestamoStore();
    const { clientes, getAllClientes } = useClienteStore();

    const form = useForm<Prestamo>({
        defaultValues,
        mode: "onTouched",
    });

    const { register, formState, handleSubmit } = form;
    const { errors, isSubmitting, isValid } = formState;

    useEffect(() => {
        // Cargar clientes al montar el componente (solo si aún no están cargados)
        if (!clientes.length) {
            getAllClientes();
        }
    }, []);

    const handleClienteChange = (event: any, value: Cliente) => {
        if (value) {
            const clienteId = value.id;
            const clienteRef = doc(db as Firestore, 'CLIENTES', clienteId);
            form.setValue('clienteRef', clienteRef);
        } else {
            form.setValue('clienteRef', null);
        }
    };

    const onSubmit = async (prestamo: Prestamo) => {
        console.log({ prestamo });
        await createPrestamo(prestamo);
        navigate("/prestamos");
    };

    const onError = (errors: FieldErrors<any>) => {
        console.log({ errors });
    };

    return (
        <section>
            <header className='mb-4 d-flex justify-content-between align-items-center'>
                <h2>Nuevo prestamo</h2>
            </header>

            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <div className="row">
                    <div className="col-md-8 mb-3">
                        <Autocomplete
                            fullWidth
                            options={clientes}
                            getOptionLabel={(cliente: Cliente) => cliente.nombres + " " + cliente.apellidos}
                            onChange={handleClienteChange}
                            renderInput={(params) => <TextField {...params} label="Cliente" />}
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

                    <div className="col-md-8 mb-3">
                        <DatePicker
                            name="fechaInicio"
                            sx={{ width: "100%" }}
                            label="Fecha de inicio"
                            minDate={dayjs(new Date())}
                            defaultValue={dayjs(new Date())}
                            onChange={(newDate) => {
                                const selectedDate = dayjs(newDate);
                                const timeStamp = selectedDate.valueOf();
                                form.setValue("fechaInicio", timeStamp);
                            }}
                        />
                    </div>

                    <div className="col-md-8 mb-3">
                        <DatePicker
                            name="fechaFinal"
                            sx={{ width: "100%" }}
                            label="Fecha limite"
                            minDate={dayjs(new Date())}
                            defaultValue={dayjs(new Date()).add(30, "day")}
                            onChange={(newDate) => {
                                const selectedDate = dayjs(newDate);
                                const timeStamp = selectedDate.valueOf();
                                form.setValue("fechaFinal", timeStamp);
                            }}
                        />
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
