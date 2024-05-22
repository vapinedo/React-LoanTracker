import { Box } from "@mui/material";
import BoxShadow from "@layouts/BoxShadow";
import { useEffect, useState } from "react";
import { getDoc } from "firebase/firestore";
import useDatetime from "@services/useDatetime";
import usePrestamoStore from "@stores/usePrestamoStore";
import { NavLink, useNavigate } from "react-router-dom";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import useNotificaciones from "@services/useNotificaciones";
import { Prestamo } from "@features/prestamos/models/Prestamo";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

export default function PrestamosAdminPage() {
  const navigate = useNavigate();
  const { getHumanDate } = useDatetime();
  const { dialogConfirm } = useNotificaciones();
  const { prestamos, loading, error, fetchPrestamos, deletePrestamo } = usePrestamoStore();

  const [prestamosData, setPrestamosData] = useState<Prestamo[]>([]);

  useEffect(() => {
    const fetchRelatedData = async () => {
      const prestamosConNombres: Prestamo[] = await Promise.all(
        prestamos.map(async (prestamo) => {
          let clienteNombre = '';
          let empleadoNombre = '';

          if (prestamo.clienteRef) {
            const clienteSnapshot = await getDoc(prestamo.clienteRef);
            if (clienteSnapshot.exists()) {
              const clienteData = clienteSnapshot.data();
              if (clienteData) {
                clienteNombre = `${clienteData.nombres || ''} ${clienteData.apellidos || ''}`;
              }
            }
          }

          if (prestamo.empleadoRef) {
            const empleadoSnapshot = await getDoc(prestamo.empleadoRef);
            if (empleadoSnapshot.exists()) {
              const empleadoData = empleadoSnapshot.data();
              if (empleadoData) {
                empleadoNombre = `${empleadoData.nombres || ''} ${empleadoData.apellidos || ''}`;
              }
            }
          }

          return {
            ...prestamo,
            clienteNombre,
            empleadoNombre,
          };
        })
      );

      setPrestamosData(prestamosConNombres);
    };

    fetchRelatedData();
  }, [prestamos]);

  const handleDetails = (params: any) => {
    return (
      <NavLink
        title={`Ver detalles de ${params.value}`}
        className="grid-table-linkable-column"
        to={`/prestamos/detalles/${params.id}`}
      >
        {params.value}
      </NavLink>
    );
  };

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
          onClick={() => handleDelete(params.id, params.row.nombres, params.row.apellidos)}
        />
      </>
    )
  };

  const handleDelete = async (id: string, nombres: string, apellidos: string) => {
    const text = `Vas a eliminar a ${nombres} ${apellidos}`;
    const { isConfirmed } = await dialogConfirm(text);
    if (isConfirmed) {
      await deletePrestamo(id);
      fetchPrestamos();
    }
  };

  const columns: GridColDef<any>[] = [
    {
      field: 'clienteNombre',
      headerName: 'Cliente',
      width: 170,
      editable: true,
      renderCell: handleDetails,
    },
    {
      field: 'empleadoNombre',
      headerName: 'Empleado',
      width: 170,
      editable: true,
      renderCell: (params) => params.value,
    },
    {
      field: 'monto',
      headerName: 'Valor',
      width: 110,
      editable: true,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 130,
      editable: true,
    },
    {
      field: 'modalidadDePago',
      headerName: 'Modo de Pago',
      width: 120,
      editable: true,
    },
    {
      field: 'fechaInicio',
      headerName: 'Fecha Inicial',
      width: 140,
      editable: true,
      renderCell: ({ formattedValue }) => getHumanDate(formattedValue),
    },
    {
      field: 'fechaFinal',
      headerName: 'Fecha Límite',
      width: 140,
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
    <BoxShadow>
      <header className="d-flex justify-content-between align-items-center">
        <h2>Lista de Prestamos</h2>
        <button onClick={() => navigate('/prestamos/nuevo')} className="btn btn-primary">
          Crear prestamo
        </button>
      </header>

      <Box sx={{ height: "100%", width: '100%', marginTop: 1 }}>
        <DataGrid
          columns={columns}
          density="compact"
          checkboxSelection
          disableColumnFilter
          rows={prestamosData}
          disableColumnSelector
          pageSizeOptions={[12]}
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
          sx={{
            border: "none",
            overflowX: "hidden",
            "& .css-128fb87-MuiDataGrid-toolbarContainer": {
              display: "flex",
              marginTop: "12px",
              marginBottom: "22px",
              flexDirection: "row-reverse",
            }
          }}
          localeText={{
            toolbarExport: "Exportar",
            toolbarQuickFilterPlaceholder: "Buscar...",
          }}
        />
      </Box>
    </BoxShadow>
  )
}
