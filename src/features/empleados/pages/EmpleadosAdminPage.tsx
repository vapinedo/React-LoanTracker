import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import useEmpleados from "@services/useEmpleados";
import { NavLink, useNavigate } from "react-router-dom"
import { IconEdit, IconTrash } from '@tabler/icons-react';
import useNotificaciones from "@services/useNotificaciones";
import { Empleado } from "@features/empleados/models/Empleado";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

export default function EmpleadosAdminPage() {

  const navigate = useNavigate();
  const { dialogConfirm } = useNotificaciones();
  const { getAllEmpleados, deleteEmpleado } = useEmpleados();
  const [empleados, setEmpleados] = useState<Empleado[] | []>([]);

  const handleDetails = (params: any) => {
    return (
      <NavLink
        title="Ver detalles"
        className="grid-table-linkable-column"
        to={`/empleados/detalles/${params.id}`} 
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
          onClick={() => navigate(`/empleados/editar/${params.id}`)} 
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
    isConfirmed && deleteEmpleado(id);
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
    const fetchEmpleados = async () => {
      const empleadoList = await getAllEmpleados();
      setEmpleados(empleadoList);
    };
    fetchEmpleados();
  }, []);

  return (
    <>
      <h2>Lista de Empleados</h2>

      <Box sx={{ height: "100%", width: '100%', marginTop: 3 }}>
        <DataGrid
          rows={empleados}
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
    </>
  )
}