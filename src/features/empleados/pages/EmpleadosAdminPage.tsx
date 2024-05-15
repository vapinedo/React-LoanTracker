import { useEffect } from 'react';
import { Box } from '@mui/material';
import useEmpleadoStore from '@store/useEmpleadoStore';
import { NavLink, useNavigate } from 'react-router-dom';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import useNotificaciones from "@services/useNotificaciones";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

export default function EmpleadosAdminPage() {
  const navigate = useNavigate();
  const { dialogConfirm } = useNotificaciones();

  const {
    empleados,
    loading,
    error,
    getAllEmpleados,
    deleteEmpleado,
  } = useEmpleadoStore();

  useEffect(() => {
    getAllEmpleados(); // Cargar empleados al montar el componente
  }, [getAllEmpleados]);

  const handleDetails = (params: any) => (
    <NavLink
      title="Ver detalles"
      className="grid-table-linkable-column"
      to={`/empleados/detalles/${params.id}`}
    >
      {params.formattedValue}
    </NavLink>
  );

  const handleActions = (params: any) => (
    <>
      <IconEdit
        color="#00abfb"
        cursor="pointer"
        onClick={() => navigate(`/empleados/editar/${params.id}`)}
      />
      <IconTrash
        color="#ff2825"
        cursor="pointer"
        style={{ marginLeft: 15 }}
        onClick={() => handleDelete(params.id, params.row.nombres, params.row.apellidos)}
      />
    </>
  );

  const handleDelete = async (id: string, nombres: string, apellidos: string) => {
    const text = `Vas a eliminar a ${nombres} ${apellidos}`;
    const { isConfirmed } = await dialogConfirm(text);
    if (isConfirmed) {
      deleteEmpleado(id);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'nombres',
      headerName: 'Nombre',
      width: 150,
      editable: true,
      renderCell: handleDetails,
    },
    {
      field: 'apellidos',
      headerName: 'Apellidos',
      width: 150,
      editable: true,
    },
    {
      field: 'correo',
      headerName: 'Correo',
      width: 110,
      editable: true,
    },
    {
      field: 'celular',
      headerName: 'Celular',
      width: 110,
      editable: true,
    },
    {
      field: 'direccion',
      headerName: 'Dirección',
      width: 280,
      editable: true,
    },
    {
      field: 'Acciones',
      renderCell: handleActions,
    },
  ];

  return (
    <>
      <header className="d-flex justify-content-between align-items-center">
        <h2>Lista de Empleados</h2>
        <button onClick={() => navigate('/empleados/nuevo')} className="btn btn-primary">
          Crear empleado
        </button>
      </header>

      <Box sx={{ height: '100%', width: '100%', marginTop: 3 }}>
        {loading ? (
          <p>Cargando empleados...</p>
        ) : error ? (
          <p>Ocurrió un error al cargar los empleados.</p>
        ) : (
          <DataGrid
            pagination
            rows={empleados}
            columns={columns}
            density="compact"
            checkboxSelection
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbar }}
            pageSizeOptions={[10, 25, 50, 100]}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
          />
        )}
      </Box>

    </>
  );
}
