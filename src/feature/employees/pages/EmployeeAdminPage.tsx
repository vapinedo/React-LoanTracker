import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { IconEdit } from '@tabler/icons-react';
import { Employee } from "@feature/employees/models/Employee";
import useEmployee from "@feature/employees/services/useEmployee";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

export default function EmployeeAdminPage() {

  const navigate = useNavigate();
  const { getAllEmployees } = useEmployee();
  const [employees, setEmployees] = useState<Employee[] | []>([]);

  const handleEdit = (params: any) => {
    return (
      <IconEdit 
        color="#00abfb" 
        cursor="pointer" 
        onClick={() => navigate(`/empleados/editar/${params.id}`)} 
      />
    )
  }

  const columns: GridColDef<any>[] = [
    {
      field: 'nombres',
      headerName: 'Nombre',
      width: 150,
      editable: true,
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
      renderCell: handleEdit,
    }
  ];

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeeList = await getAllEmployees();
      setEmployees(employeeList);
    };
    fetchEmployees();
  }, [employees]);

  return (
    <div>
      <header className="d-flex justify-content-between align-items-center">
        <h2>Lista de Empleados</h2>
        <button onClick={() => navigate("/empleados/nuevo")} className="btn btn-primary">Crear empleado</button>
      </header>

      <Box sx={{ height: 400, width: '100%', marginTop: 3 }}>
        <DataGrid
          rows={employees}
          columns={columns}
          checkboxSelection
          disableColumnFilter
          pageSizeOptions={[5]}
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
                pageSize: 5,
              },
            },
          }}
        />
      </Box>
    </div>
  )
}