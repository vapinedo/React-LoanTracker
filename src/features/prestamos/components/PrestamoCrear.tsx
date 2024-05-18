import dayjs from 'dayjs';
import * as yup from 'yup';
import db from '@firebaseConfig';
import { useEffect } from 'react';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import { doc, Firestore } from 'firebase/firestore';
import useClienteStore from '@stores/useClienteStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldErrors, useForm } from 'react-hook-form';
import useEmpleadoStore from '@stores/useEmpleadoStore';
import usePrestamoStore from '@stores/usePrestamoStore';
import { Cliente } from '@features/clientes/models/Cliente';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Prestamo } from '@features/prestamos/models/Prestamo';
import { Empleado } from '@features/empleados/models/Empleado';
import CustomTextField from '@components/form/CustomTextField';
import CustomCurrencyInput from '@components/form/CustomCurrencyInput';
import { estadoPrestamoOptions, modalidadDePagoOptions } from '@mocks/DropdownOptions';
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, TextField } from '@mui/material';

const defaultValues: Prestamo = {
    id: null,
    monto: null,
    interes: null,
    fechaInicio: new Date().getTime(),
    fechaFinal: new Date().getTime(),
    estado: "Activo",
    modalidadDePago: "Diario",
    clienteRef: null,
    empleadoRef: null,
};

const schema = yup.object().shape({
    clienteRef: yup.object().nullable().required('Cliente es requerido'),
    empleadoRef: yup.object().nullable().required('Empleado es requerido'),
    monto: yup
        .string()
        .test('required', 'Monto es requerido', function (value) {
            return value !== undefined && value !== null && value.trim() !== '';
        })
        .test('numeric', 'El monto debe contener solo caracteres numéricos', function(value) {
            if (typeof value === 'string' && value.trim() !== '') {
                // Verifica si el valor contiene solo caracteres numéricos y opcionalmente separadores de miles y un punto decimal
                return /^[0-9]+(\.[0-9]+)?(,[0-9]+)?$/.test(value.trim().replace(/\./g, ''));
            }
            // Si el valor no es una cadena válida, no cumple con la validación numérica
            return false;
        })                      
        .nullable(),
    interes: yup.number().nullable().positive('El interés debe ser mayor que cero'),
    modalidadDePago: yup.string().required('Modalidad de pago es requerida'),
    estado: yup.string().required('Estado es requerido'),
    fechaInicio: yup.number().required('Fecha de inicio es requerida'),
    fechaFinal: yup.number().required('Fecha límite es requerida').min(yup.ref('fechaInicio'), 'La fecha límite debe ser posterior a la fecha de inicio')
});

export default function PrestamoCrear() {
    const navigate = useNavigate();
    const { createPrestamo } = usePrestamoStore();
    const { clientes, getAllClientes } = useClienteStore();
    const { empleados, getAllEmpleados } = useEmpleadoStore();

    const form = useForm<Prestamo>({
        defaultValues,
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    const { control, register, formState, handleSubmit } = form;
    const { errors, isSubmitting, isValid } = formState;

    useEffect(() => {
        // Cargar clientes al montar el componente (solo si aún no están cargados)
        if (!clientes.length) {
            getAllClientes();
        }
    }, []);

    useEffect(() => {
        // Cargar empleados al montar el componente (solo si aún no están cargados)
        if (!empleados.length) {
            getAllEmpleados();
        }
    }, []);

    const handleClienteChange = (event: any, value: Cliente | null) => {
        if (value) {
            const clienteId = value.id;
            const clienteRef = doc(db as Firestore, 'CLIENTES', clienteId);
            form.setValue('clienteRef', clienteRef);
        } else {
            form.setValue('clienteRef', null);
        }
    };

    const handleEmpleadoChange = (event: any, value: Empleado | null) => {
        if (value) {
            const empleadoId = value.id;
            const empleadoRef = doc(db as Firestore, 'EMPLEADOS', empleadoId);
            form.setValue('empleadoRef', empleadoRef);
        } else {
            form.setValue('empleadoRef', null);
        }
    };

    const onSubmit = async (prestamo: Prestamo) => {
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
                        <Autocomplete
                            fullWidth
                            options={empleados}
                            getOptionLabel={(empleado: Empleado) => empleado.nombres + " " + empleado.apellidos}
                            onChange={handleEmpleadoChange}
                            renderInput={(params) => <TextField {...params} label="Empleado" />}
                        />
                    </div>

                    <div className="col-md-8 mb-3">
                        <CustomCurrencyInput
                            name="monto"
                            label="Monto"
                            control={control}
                            helperText={errors.monto?.message}
                        />
                    </div>

                    <div className="col-md-8 mb-3">
                        <CustomTextField
                            type="text"
                            name="interes"
                            label="Interés"
                            register={register("interes")}
                            error={errors.interes?.message}
                        />
                    </div>

                    <div className="col-md-8 mb-3">
                        <FormControl fullWidth>
                            <InputLabel>Modalidad de pago</InputLabel>
                            <Select
                                defaultValue="Diario"
                                name="modalidadDePago"
                                label="Modalidad de pago"
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
                                name="estado"
                                defaultValue="Activo"
                                label="Estado"
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
