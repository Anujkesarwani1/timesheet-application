import { Box, Grid, Stack } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import Button from 'components/atoms/Button'
import MuiTypography from 'components/atoms/Typography'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_API } from 'services/api'

const managerColumns: GridColDef[] = [
  {
    field: 'managerId',
    headerName: 'Manager ID',
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <MuiTypography variant="subtitle2">
          {params.row.managerId}
        </MuiTypography>
      )
    },
  },
  {
    field: 'managerName',
    headerName: 'Manager Name',
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <MuiTypography variant="subtitle2">
          {params.row.managerName}
        </MuiTypography>
      )
    },
  },
]

const managerRows = [
  {
    id: 1,
    managerId: 'M1',
    managerName: 'Rahul',
  },
]

const employeeColumns: GridColDef[] = [
  {
    field: 'employeeId',
    headerName: 'Employee ID',
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <MuiTypography variant="subtitle2">
          {params.row.employeeId}
        </MuiTypography>
      )
    },
  },
  {
    field: 'name',
    headerName: 'Employee Name',
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <MuiTypography variant="subtitle2">{params.row.name}</MuiTypography>
      )
    },
  },
]

const employeeRows = [
  {
    id: 1,
    employeeId: '111',
    employeeName: 'Anuj',
  },
]

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [managerData, setManagerData] = useState(managerRows)
  const [employeeData, setEmployeeData] = useState(employeeRows)
  const [isError, setIsError] = useState('')

  const getManagerData = async () => {
    try {
      const response = await MOCK_API.get('/manager')
      setManagerData(response.data)
    } catch (error: any) {
      setIsError(error.message)
    }
  }

  const getEmployeeData = async () => {
    try {
      const response = await MOCK_API.get('/timesheet')
      const uniqueEmployeeData = getUniqueRecordsByEmail(response.data)
      setEmployeeData(uniqueEmployeeData)
    } catch (error: any) {
      setIsError(error.message)
    }
  }

  function getUniqueRecordsByEmail(data: any) {
    const uniqueRecords = []
    const emailSet = new Set()

    for (const record of data) {
      if (!emailSet.has(record.email)) {
        emailSet.add(record.email)
        uniqueRecords.push(record)
        console.log(uniqueRecords)
      }
    }

    return uniqueRecords
  }
  useEffect(() => {
    getManagerData()
    getEmployeeData()
  }, [])
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '20vh' }}
      flexDirection="column"
      gap={4}
    >
      <Grid item xs={5} textAlign="center">
        <MuiTypography variant="h2">Admin Dashboard</MuiTypography>
      </Grid>

      <Grid item>
        <Grid container flexDirection="row" gap={2} justifyContent="center">
          <Grid item>
            <DataGrid
              rows={managerData}
              columns={managerColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
          </Grid>
          <Grid item>
            <DataGrid
              rows={employeeData}
              columns={employeeColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={5} textAlign="center" marginTop="2rem">
        <Button
          variant="contained"
          size="large"
          sx={{ textTransform: 'none' }}
          onClick={() => navigate('/new-employee')}
        >
          New Employee
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{
            textTransform: 'none',
            marginLeft: '2rem',
            marginRight: '2rem',
          }}
          onClick={() => navigate('/new-manager')}
        >
          New Manager
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/')}
        >
          Log out
        </Button>
      </Grid>
    </Grid>
  )
}

export default AdminDashboard
