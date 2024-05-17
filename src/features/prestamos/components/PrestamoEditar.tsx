import dayjs from 'dayjs';
import db from '@firebaseConfig';
import { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import useClienteStore from '@stores/useClienteStore';
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
};

export default function PrestamoEditar() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { updatePrestamo, getPrestamo, loading, error } = usePrestamoStore();
    const { clientes, getAllClientes } = useClienteStore();
    const { empleados, getAllEmpleados } = useEmpleadoStore();
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [empleado, setEmpleado] = useState<Empleado | null>(null);

    const form = useForm<Prestamo>({
        defaultValues: defaultValues,
        mode: "onTouched",
    });

    const { register, formState, handleSubmit, setValue, getValues, watch } = form;
    const { errors, isSubmitting, isValid } = formState;

    useEffect(() => {
        const loadPrestamo = async () => {
            const prestamo = await getPrestamo(id);
            if (prestamo) {
                setValue('id', prestamo.id);
                setValue('monto', prestamo.monto);
                setValue('interes', prestamo.interes);
                setValue('fechaInicio', prestamo.fechaInicio);
                setValue('fechaFinal', prestamo.fechaFinal);
                setValue('estado', prestamo.estado);
                setValue('modalidadDePago', prestamo.modalidadDePago); // Actualiza el valor del Select

                if (prestamo.clienteRef) {
                    const clienteDoc = await getDoc(prestamo.clienteRef);
                    if (clienteDoc.exists()) {
                        const clienteData = clienteDoc.data() as Cliente;
                        setCliente(clienteData);
                        setValue('clienteRef', prestamo.clienteRef);
                    }
                }

                if (prestamo.empleadoRef) {
                    const empleadoDoc = await getDoc(prestamo.empleadoRef);
                    if (empleadoDoc.exists()) {
                        const empleadoData = empleadoDoc.data() as Empleado;
                        setEmpleado(empleadoData);
                        setValue('empleadoRef', prestamo.empleadoRef);
                    }
                }
            }
        };

        loadPrestamo();
    }, [id, setValue, getPrestamo]);

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
            const clienteId = value.id;
            const clienteRef = doc(db as Firestore, 'CLIENTES', clienteId);
            setValue('clienteRef', clienteRef);
            setCliente(value); // Actualizar el estado local
        } else {
            setValue('clienteRef', null);
            setCliente(null); // Actualizar el estado local
        }
    };

    const handleEmpleadoChange = (event: any, value: Empleado | null) => {
        if (value) {
            const empleadoId = value.id;
            const empleadoRef = doc(db as Firestore, 'EMPLEADOS', empleadoId);
            setValue('empleadoRef', empleadoRef);
            setEmpleado(value); // Actualizar el estado local
        } else {
            setValue('empleadoRef', null);
            setEmpleado(null); // Actualizar el estado local
        }
    };

    const onSubmit = async (prestamo: Prestamo) => {
        const clienteRef = getValues('clienteRef');
        const empleadoRef = getValues('empleadoRef');
        const updatedPrestamo = { ...prestamo, clienteRef, empleadoRef };

        await updatePrestamo(updatedPrestamo);
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
                <h2>Editar prestamo</h2>
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
                                value={watch('modalidadDePago')} // Usamos watch para sincronizar el valor dinámicamente
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setValue('modalidadDePago', value);
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
                                value={watch('estado')} // Usamos watch para sincronizar el valor dinámicamente
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setValue('estado', value);
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
                                const selectedDate = dayjs(newDate);
                                const timeStamp = selectedDate.valueOf();
                                setValue('fechaFinal', timeStamp);
                            }}
                        />
                    </div>
                </div>
                <Button type="submit" sx={{ marginTop: 2 }} variant="contained" color="success" disabled={isSubmitting || !isValid}>
                    Guardar
                </Button>
            </form>
        </section>
    );
}
