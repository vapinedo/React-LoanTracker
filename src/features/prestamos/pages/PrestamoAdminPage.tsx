import { useEffect } from "react";
import { Box } from "@mui/material";
import useDatetime from "@services/useDatetime";
import usePrestamoStore from "@stores/usePrestamoStore";
import { NavLink, useNavigate } from "react-router-dom";
import { IconEdit, IconTrash } from '@tabler/icons-react';
import useNotificaciones from "@services/useNotificaciones";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

export default function PrestamosAdminPage() {
  const navigate = useNavigate();
  const { getHumanDate } = useDatetime();
  const { dialogConfirm } = useNotificaciones();
  const { prestamos, loading, error, fetchPrestamos, deletePrestamo } = usePrestamoStore();

  const handleDetails = (params: any) => {
    return (
      <NavLink
        title="Ver detalles"
        className="grid-table-linkable-column"
        to={`/prestamos/detalles/${params.id}`} 
      >
        {params.formattedValue}
      </NavLink>
    )
  }

  const handleActions = (params: any) => {
    const { id, row } = params;
    const { nombres, apellidos } = row;
    return (
      <>
        <IconEdit 
          color="#00abfb" 
          cursor="pointer" 
          onClick={() => navigate(`/prestamos/editar/${params.id}`)} 
        />
        <IconTrash 
          color="#ff2825" 
          cursor="pointer"
          style={{ marginLeft: 15 }}
          onClick={() => handleDelete(id, nombres, apellidos)} 
        />
      </>
    )
  };

  const handleDelete = async (id: string, nombres: string, apellidos: string) => {
    const text = `Vas a eliminar a ${nombres} ${apellidos}`;
    const { isConfirmed } = await dialogConfirm(text);
    if (isConfirmed) {
      await deletePrestamo(id);
      fetchPrestamos(); // Refresh prestamos after deletion
    }
  };

  const columns: GridColDef<any>[] = [
    {
      field: 'clienteNombre',
      headerName: 'Cliente',
      width: 240,
      editable: true,
      renderCell: handleDetails,
    },
    {
      field: 'empleadoNombre',
      headerName: 'Empleado',
      width: 240,
      editable: true,
    },
    {
      field: 'monto',
      headerName: 'Valor',
      width: 120,
      editable: true,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 110,
      editable: true,
    },
    {
      field: 'modalidadDePago',
      headerName: 'Modo de Pago',
      width: 130,
      editable: true,
    },
    {
      field: 'fechaInicio',
      headerName: 'Fecha Inicial',
      width: 250,
      editable: true,
      renderCell: ({ formattedValue }) => getHumanDate(formattedValue),
    },
    {
      field: 'fechaFinal',
      headerName: 'Fecha Límite',
      width: 250,
      editable: true,
      renderCell: ({ formattedValue }) => getHumanDate(formattedValue),
    },
    {
      field: " ",
      renderCell: handleActions,
    }
  ];

  useEffect(() => {
    fetchPrestamos();
  }, [fetchPrestamos]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <header className="d-flex justify-content-between align-items-center">
        <h2>Lista de Prestamos</h2>
        <button onClick={() => navigate("/prestamos/nuevo")} className="btn btn-primary">Crear prestamo</button>
      </header>

      <Box sx={{ height: "100%", width: '100%', marginTop: 3 }}>
        <DataGrid
          rows={prestamos}
          columns={columns}
          density="compact"
          checkboxSelection
          disableColumnFilter
          pageSizeOptions={[12]}
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            }
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 12,
              },
            },
          }}
        />
      </Box>
    </div>
  )
}
