import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import usePrestamos from "@services/usePrestamos";
import { NavLink, useNavigate } from "react-router-dom"
import { IconEdit, IconTrash } from '@tabler/icons-react';
import useNotificaciones from "@services/useNotificaciones";
import { Prestamo } from "@features/prestamos/models/Prestamo";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

export default function PrestamosAdminPage() {

  const navigate = useNavigate();
  const { dialogConfirm } = useNotificaciones();
  const { getAllPrestamos, deletePrestamo } = usePrestamos();
  const [prestamos, setPrestamos] = useState<Prestamo[] | []>([]);

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
    isConfirmed && deletePrestamo(id);
  };

  const columns: GridColDef<any>[] = [
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
      field: " ",
      renderCell: handleActions,
    }
  ];

  useEffect(() => {
    const fetchPrestamos = async () => {
      const prestamoList = await getAllPrestamos();
      setPrestamos(prestamoList);
    };
    fetchPrestamos();
  }, []);

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