import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Box, Grid } from '@mui/material'
import MuiTypography from '../../atoms/Typography'
import Button from '../../atoms/Button'
import { MOCK_API } from '../../../services/api'
import theme from '../../../themes'
import CustomTextField from 'components/atoms/Input'
import { useNavigate } from 'react-router-dom'

const columns = (onRowClick: (row: any) => void): GridColDef[] => [
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
    field: 'employeeName',
    headerName: 'Employee Name',
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <MuiTypography variant="subtitle2">{params.row.name}</MuiTypography>
      )
    },
  },
  {
    field: 'projectName',
    headerName: 'Project Name',
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <MuiTypography variant="subtitle2">
          {params.row.projectName}
        </MuiTypography>
      )
    },
  },
  {
    field: 'task',
    headerName: 'Task',
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <MuiTypography variant="subtitle2">{params.row.task}</MuiTypography>
      )
    },
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 110,
    editable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <MuiTypography variant="subtitle2">{params.row.date}</MuiTypography>
      )
    },
  },
  {
    field: 'hours',
    headerName: 'Hours',
    width: 160,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <MuiTypography variant="subtitle2">{params.row.hours}</MuiTypography>
      )
    },
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 160,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <MuiTypography variant="subtitle2">
          {params.row.description}
        </MuiTypography>
      )
    },
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 100,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <MuiTypography variant="subtitle2">{params.row.rating}</MuiTypography>
      )
    },
  },
  {
    field: 'option',
    headerName: '',
    width: 150,
    flex: 1,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Button
          variant="text"
          size="small"
          sx={{ textTransform: 'none' }}
          onClick={() => onRowClick(params.row)}
        >
          Edit
        </Button>
      )
    },
  },
]

const rows = [
  {
    id: 1,
    employeeId: '111',
    employeeName: 'Anuj',
    projectName: 'Project1',
    task: 'task1',
    date: '12/05/2023',
    hours: 5,
    description: 'description1',
    rating: '-',
  },
  {
    id: 2,
    employeeId: '112',
    employeeName: 'Aman',
    projectName: 'Project2',
    task: 'task1',
    date: '12/05/2023',
    hours: 2,
    description: 'description1',
    rating: '-',
  },
  {
    id: 3,
    employeeId: '113',
    employeeName: 'Vibhuti',
    projectName: 'Project3',
    task: 'task1',
    date: '12/05/2023',
    hours: 3,
    description: 'description1',
    rating: '-',
  },
]

const ManagerDashboard = () => {
  const [myData, setMyData] = useState(rows)
  const [loading, setLoading] = useState<boolean>(true)
  const [rating, setRating] = useState<string>('')
  const [showRating, setShowRating] = useState(false)
  const [row, setRow] = useState<any>()
  const [isError, setIsError] = useState('')
  const navigate = useNavigate()

  const managerEmail = localStorage.getItem('email')

  const getApiData = async () => {
    try {
      const response = await MOCK_API.get('/timesheet')
      const response2 = await MOCK_API.get('/manager')

      if (managerEmail) {
        const manager = response2.data.find(
          (mgr: any) => mgr.managerEmail === managerEmail
        )

        if (manager) {
          const employeeIds = manager.employeeIds

          const filteredEmployees = response.data.filter((employee: any) =>
            employeeIds.includes(employee.employeeId)
          )

          setMyData(filteredEmployees)
        }
      }

      setLoading(false)
    } catch (error: any) {
      setIsError(error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    getApiData()
  }, [])

  if (loading) {
    return <Grid>Loading...</Grid>
  }

  const handleRating = async () => {
    try {
      const response = await MOCK_API.patch(`/timesheet/${row.id}`, {
        rating: rating,
      })

      if (response.status === 200) {
        const updatedData = myData.map((item) =>
          item.id === row.id ? { ...item, rating: rating } : item
        )
        setMyData(updatedData)

        setRating('')

        setShowRating(false)

        console.log('Rating updated successfully.')
      } else {
        console.error('Error updating the rating.')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleRowClick = (row: any) => {
    setShowRating(!showRating)
    setRow(row)
    console.log(row)
  }

  return (
    <Grid
      container
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={4}
    >
      <Grid item>
        <MuiTypography variant="h2">Manager Dashboard</MuiTypography>
      </Grid>

      <Grid item style={{ width: '72vw' }}>
        <DataGrid
          rows={myData}
          columns={columns(handleRowClick)}
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
        {showRating && (
          <Grid container flexDirection="row" gap={2}>
            <Grid item>
              <CustomTextField
                label="Rating"
                value={rating}
                onChange={(e) => {
                  const value = e.target.value
                  if (/^[1-5]$/.test(value)) {
                    setRating(value)
                  }
                }}
                size="small"
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ textTransform: 'none' }}
                onClick={handleRating}
                size="large"
              >
                Update Rating
              </Button>
            </Grid>
          </Grid>
        )}
        {isError !== '' && (
          <MuiTypography variant="body2" color={theme.palette.Text.warning}>
            {isError}
          </MuiTypography>
        )}
      </Grid>

      <Grid item>
        <Button variant="contained" size="large" onClick={() => navigate('/')}>
          Log out
        </Button>
      </Grid>
    </Grid>
  )
}

export default ManagerDashboard
