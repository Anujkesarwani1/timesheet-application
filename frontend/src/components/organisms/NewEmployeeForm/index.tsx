import { Button, Grid } from '@mui/material'
import CustomTextField from 'components/atoms/Input'
import MuiTypography from 'components/atoms/Typography'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_API } from 'services/api'

const NewEmployeeForm = () => {
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

  const isAnyInputEmpty = () => {
    return (
      employeeId === '' || name === '' || email === '' || projectName === ''
    )
  }

  const handleSubmit = async () => {
    if (isAnyInputEmpty()) {
      console.error('Please fill in all the fields before submitting.')
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
        navigate('/admin')
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
      style={{ minHeight: '60vh' }}
    >
      <Grid item xs={12} textAlign="center">
        <MuiTypography variant="h2">New Employee</MuiTypography>
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
        {message && (
          <MuiTypography variant="body1">
            Thanks for submitting the form!
          </MuiTypography>
        )}
      </Grid>
    </Grid>
  )
}

export default NewEmployeeForm
