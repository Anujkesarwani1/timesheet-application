import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Box, Grid, Modal, Popover, Stack } from '@mui/material'
import MuiTypography from '../../atoms/Typography'
import Button from '../../atoms/Button'
import { MOCK_API } from '../../../services/api'
import theme from '../../../themes'
import { useNavigate } from 'react-router-dom'
import CustomTextField from 'components/atoms/Input'

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
          disabled={params.row.rating != '-'}
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
    employeeId: 'E1',
    employeeName: 'Anuj',
    projectName: 'Project1',
    task: 'task1',
    date: '12/05/2023',
    hours: 5,
    description: 'description1',
    rating: '-',
  },
]

const EmployeeDashboard = () => {
  const navigate = useNavigate()
  const [row, setRow] = useState<any>()
  const [myData, setMyData] = useState(rows)
  const [loading, setLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState('')
  const [task, setTask] = useState('')
  const [rating, setRating] = useState('')
  const [date, setDate] = useState('')
  const [hours, setHours] = useState<any>()
  const [description, setDescription] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  const email = localStorage.getItem('email')
  const getApiData = async () => {
    try {
      const response = await MOCK_API.get('/timesheet')

      if (email) {
        const filteredEmployee = response.data.filter(
          (employee: any) => employee.email === email
        )

        setMyData(filteredEmployee)
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

  const handleRowClick = (row: any) => {
    setIsEdit(!isEdit)
    setRow(row)
    setTask(row.task)
    setDate(row.data)
    setHours(row.hours)
    setDescription(row.description)
    setRating(row.rating)
    console.log(row)
  }

  const handleUpdateButton = async () => {
    try {
      const response = await MOCK_API.patch(`/timesheet/${row.id}`, {
        date: date,
        hours: hours,
        description: description,
        task: task,
        rating: rating,
      })

      if (response.status === 200) {
        const updatedData = myData.map((item) =>
          item.id === row.id
            ? {
                ...item,
                task: task,
                date: date,
                hours: hours,
                description: description,
                rating: rating,
              }
            : item
        )
        setMyData(updatedData)

        setRating('')
        setTask('')
        setDate('')
        setHours(0)
        setDescription('')
        setIsEdit(!isEdit)
      }
    } catch (error) {
      console.error('Error:', error)
    }
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
        <MuiTypography variant="h2">Employee Timesheet</MuiTypography>
      </Grid>

      <Grid item sx={{ width: '72vw' }}>
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
        {isEdit && (
          <Stack gap={2}>
            <CustomTextField
              label="Task"
              size="small"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <CustomTextField
              size="small"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <CustomTextField
              label="Hours"
              size="small"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
            <CustomTextField
              label="Description"
              size="small"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ textTransform: 'none', marginTop: '1rem' }}
              onClick={handleUpdateButton}
            >
              Update
            </Button>
          </Stack>
        )}
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          onClick={() => navigate('/timesheet')}
          sx={{ textTransform: 'none' }}
          size="large"
        >
          Fill New Entry
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{ marginLeft: '1rem' }}
          size="large"
        >
          Log out
        </Button>
        {isError !== '' && (
          <MuiTypography variant="body2" color={theme.palette.Text.warning}>
            {isError}
          </MuiTypography>
        )}
      </Grid>
    </Grid>
  )
}

export default EmployeeDashboard
