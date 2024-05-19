import dayjs from 'dayjs';
import * as yup from 'yup';
import db from '@firebaseConfig';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import useClienteStore from '@stores/useClienteStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldErrors, useForm } from 'react-hook-form';
import useEmpleadoStore from '@stores/useEmpleadoStore';
import usePrestamoStore from '@stores/usePrestamoStore';
import { useNavigate, useParams } from "react-router-dom";
import { doc, Firestore, getDoc } from 'firebase/firestore';
import { Cliente } from '@features/clientes/models/Cliente';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Prestamo } from '@features/prestamos/models/Prestamo';
import { Empleado } from '@features/empleados/models/Empleado';
import CustomTextField from '@components/form/CustomTextField';
import CustomCurrencyInput from '@app/components/form/CustomCurrencyInput';
import { estadoPrestamoOptions, modalidadDePagoOptions } from '@mocks/DropdownOptions';
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, TextField } from '@mui/material';

const defaultValues: Prestamo = {
    id: null,
    monto: null,
    interes: null,
    fechaInicio: new Date().getTime(),
    fechaFinal: dayjs(new Date()).add(30, 'day').valueOf(),
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
        .test('required', 'Monto es requerido', value => value && value.trim() !== '')
        .test('numeric', 'El monto debe contener solo caracteres numéricos', value => /^[0-9]+(\.[0-9]+)?(,[0-9]+)?$/.test(value?.trim()?.replace(/\./g, '')))
        .nullable(),
    interes: yup.number().nullable().positive('El interés debe ser mayor que cero'),
    modalidadDePago: yup.string().required('Modalidad de pago es requerida'),
    estado: yup.string().required('Estado es requerido'),
    fechaInicio: yup.number().required('Fecha de inicio es requerida'),
    fechaFinal: yup.number().required('Fecha límite es requerida').min(yup.ref('fechaInicio'), 'La fecha límite debe ser posterior a la fecha de inicio')
});

interface PrestamoFormProps {
    isEditMode: boolean;
}

export default function PrestamoForm({ isEditMode }: PrestamoFormProps) {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { clientes, getAllClientes } = useClienteStore();
    const { empleados, getAllEmpleados } = useEmpleadoStore();
    const { createPrestamo, updatePrestamo, getPrestamo, loading, error } = usePrestamoStore();
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [empleado, setEmpleado] = useState<Empleado | null>(null);

    const form = useForm<Prestamo>({
        defaultValues: defaultValues,
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    const { control, register, formState, handleSubmit, setValue, getValues, watch, reset } = form;
    const { errors, isSubmitting, isValid } = formState;

    useEffect(() => {
        const loadPrestamo = async () => {
            if (isEditMode && id) {
                try {
                    const prestamo = await getPrestamo(id);
                    if (prestamo) {
                        reset({
                            ...prestamo,
                            fechaInicio: dayjs(prestamo.fechaInicio).valueOf(),
                            fechaFinal: dayjs(prestamo.fechaFinal).valueOf(),
                        });

                        if (prestamo.clienteRef) {
                            const clienteDoc = await getDoc(prestamo.clienteRef);
                            if (clienteDoc.exists()) {
                                setCliente(clienteDoc.data() as Cliente);
                            }
                        }

                        if (prestamo.empleadoRef) {
                            const empleadoDoc = await getDoc(prestamo.empleadoRef);
                            if (empleadoDoc.exists()) {
                                setEmpleado(empleadoDoc.data() as Empleado);
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error loading prestamo:", error);
                }
            }
        };

        loadPrestamo();
    }, [isEditMode, id, reset, getPrestamo]);

    useEffect(() => {
        if (!clientes.length) {
            getAllClientes();
        }
    }, [clientes, getAllClientes]);

    useEffect(() => {
        if (!empleados.length) {
            getAllEmpleados();
        }
    }, [empleados, getAllEmpleados]);

    const handleClienteChange = (event: any, value: Cliente | null) => {
        if (value) {
            const clienteRef = doc(db as Firestore, 'CLIENTES', value.id);
            setValue('clienteRef', clienteRef);
            setCliente(value);
        } else {
            setValue('clienteRef', null);
            setCliente(null);
        }
    };

    const handleEmpleadoChange = (event: any, value: Empleado | null) => {
        if (value) {
            const empleadoRef = doc(db as Firestore, 'EMPLEADOS', value.id);
            setValue('empleadoRef', empleadoRef);
            setEmpleado(value);
        } else {
            setValue('empleadoRef', null);
            setEmpleado(null);
        }
    };

    const onSubmit = async (prestamo: Prestamo) => {
        const clienteRef = getValues('clienteRef');
        const empleadoRef = getValues('empleadoRef');
        const updatedPrestamo = { ...prestamo, clienteRef, empleadoRef };

        if (isEditMode) {
            await updatePrestamo(updatedPrestamo);
        } else {
            await createPrestamo(updatedPrestamo);
        }

        navigate("/prestamos");
    };

    const onError = (errors: FieldErrors<any>) => {
        console.log({ errors });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section>
            <header className='mb-4 d-flex justify-content-between align-items-center'>
                <h2>{isEditMode ? 'Editar préstamo' : 'Nuevo préstamo'}</h2>
            </header>

            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <div className="row">
                    <div className="col-md-8 mb-3">
                        <Autocomplete
                            fullWidth
                            options={clientes}
                            getOptionLabel={(cliente: Cliente) => `${cliente.nombres} ${cliente.apellidos}`}
                            value={cliente}
                            onChange={handleClienteChange}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} label="Cliente" />}
                        />
                    </div>

                    <div className="col-md-8 mb-3">
                        <Autocomplete
                            fullWidth
                            options={empleados}
                            getOptionLabel={(empleado: Empleado) => `${empleado.nombres} ${empleado.apellidos}`}
                            value={empleado}
                            onChange={handleEmpleadoChange}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
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
                                label="Modalidad de pago"
                                value={watch('modalidadDePago')}
                                onChange={(event) => setValue('modalidadDePago', event.target.value)}
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
                                label="Estado"
                                value={watch('estado')}
                                onChange={(event) => setValue('estado', event.target.value)}
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
                                const timeStamp = dayjs(newDate).valueOf();
                                setValue('fechaInicio', timeStamp);
                            }}
                        />
                    </div>

                    <div className="col-md-8 mb-3">
                        <DatePicker
                            name="fechaFinal"
                            sx={{ width: "100%" }}
                            label="Fecha de finalización"
                            minDate={dayjs(new Date())}
                            defaultValue={dayjs(new Date())}
                            onChange={(newDate) => {
                                const timeStamp = dayjs(newDate).valueOf();
                                setValue('fechaFinal', timeStamp);
                            }}
                        />
                    </div>
                </div>
                <Button 
                    type="submit" 
                    variant="contained" 
                    sx={{ marginTop: 2 }} 
                    disabled={isSubmitting || !isValid}
                    color={isEditMode ? 'success' : 'primary'}>
                    {isEditMode ? 'Actualizar' : 'Guardar'}
                </Button>
            </form>
        </section>
    );
}
