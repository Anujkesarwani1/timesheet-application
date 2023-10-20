import { Button, Grid, Stack } from '@mui/material'
import MuiTypography from 'components/atoms/Typography'
import CustomTextField from 'components/atoms/Input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_API } from 'services/api'
import theme from 'themes'

const TimesheetForm = () => {
  const [employeeId, setEmployeeId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [projectName, setProjectName] = useState('')
  const [task, setTask] = useState('')
  const [date, setDate] = useState('')
  const [hours, setHours] = useState('')
  const [description, setDescription] = useState('')
  const [rating, setRating] = useState('-')
  const [message, setMessage] = useState(false)
  const navigate = useNavigate()
  const employeeEmail = localStorage.getItem('email')

  const isAnyInputEmpty = () => {
    return (
      employeeId === '' ||
      name === '' ||
      projectName === '' ||
      task === '' ||
      date === '' ||
      hours === '' ||
      description === ''
    )
  }

  const handleSubmit = async () => {
    if (isAnyInputEmpty()) {
      console.error('Please fill in all the fields before submitting.')
      return
    }
    if (email !== employeeEmail) {
      alert('Email does not match the employee email.')
      setMessage(true)
      return
    }
    try {
      const formData = {
        employeeId,
        name,
        email,
        projectName,
        task,
        date,
        hours,
        description,
        rating,
      }

      const response = await MOCK_API.post('/timesheet', formData)

      if (response.status === 201) {
        console.log('Data submitted successfully.')
        setEmployeeId('')
        setName('')
        setEmail('')
        setProjectName('')
        setTask('')
        setDate('')
        setHours('')
        setDescription('')
        setRating('-')
        setMessage(true)
        navigate('/employee')
      } else {
        console.error('Error submitting the data.')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '90vh' }}
    >
      <Grid item xs={12} textAlign="center">
        <MuiTypography variant="h2">Fill Timesheet Form</MuiTypography>
      </Grid>
      <Grid item xs={8} textAlign="center">
        <form>
          <CustomTextField
            size="small"
            sx={{ marginTop: '2rem' }}
            label="Employee ID"
            variant="outlined"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <CustomTextField
            size="small"
            sx={{ marginTop: '2rem' }}
            label="Employee Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CustomTextField
            size="small"
            sx={{ marginTop: '2rem' }}
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomTextField
            size="small"
            sx={{ marginTop: '2rem' }}
            label="Project Name"
            variant="outlined"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <CustomTextField
            size="small"
            sx={{ marginTop: '2rem' }}
            label="Task"
            variant="outlined"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <CustomTextField
            size="small"
            sx={{ marginTop: '2rem' }}
            // label="Date"
            variant="outlined"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <CustomTextField
            size="small"
            sx={{ marginTop: '2rem' }}
            label="Hours"
            variant="outlined"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
          <CustomTextField
            size="small"
            multiline
            sx={{ marginTop: '2rem' }}
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </form>
      </Grid>
      <Grid item xs={8} textAlign="center">
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ marginTop: '2rem', marginBottom: '2rem', marginRight: '2rem' }}
          disabled={isAnyInputEmpty()}
          size="large"
        >
          Submit
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/employee')}
          sx={{
            marginTop: '2rem',
            marginBottom: '2rem',
            textTransform: 'none',
          }}
          size="large"
        >
          Timesheet
        </Button>
        {message && (
          <MuiTypography variant="body1">
            Thanks for submitting the form!
          </MuiTypography>
        )}
      </Grid>
    </Grid>
  )
}

export default TimesheetForm
