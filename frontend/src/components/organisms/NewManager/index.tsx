import { Button, Grid } from '@mui/material'
import CustomTextField from 'components/atoms/Input'
import MuiTypography from 'components/atoms/Typography'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_API } from 'services/api'

const NewManagerForm = () => {
  const [managerId, setManagerId] = useState('')
  const [managerName, setManagerName] = useState('')
  const [managerEmail, setManagerEmail] = useState('')
  const [message, setMessage] = useState(false)
  const [empIds, setEmpIds] = useState<any>('')
  const [employeeIds, setEmployeeIds] = useState<string[]>([])
  const navigate = useNavigate()

  const isAnyInputEmpty = () => {
    return managerId === '' || managerName === ''
  }

  const handleSubmit = async () => {
    if (isAnyInputEmpty()) {
      console.error('Please fill in all the fields before submitting.')
      return
    }
    try {
      const formData = {
        managerId,
        managerName,
        managerEmail,
        employeeIds,
      }

      const response = await MOCK_API.post('/manager', formData)

      if (response.status === 201) {
        console.log('Data submitted successfully.')
        setManagerId('')
        setManagerName('')
        setManagerEmail('')
        setEmployeeIds([])
        setMessage(true)
        navigate('/admin')
      } else {
        console.error('Error submitting the data.')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleEmployeeIds = (e: any) => {
    const inputIds = e.target.value
    const ids = inputIds.split(',').map((id: string) => id.trim())
    const validIds = ids.filter((id: string) => id !== '')
    setEmployeeIds(validIds)
    setEmpIds(inputIds)
    console.log(employeeIds)
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '60vh' }}
    >
      <Grid item xs={12} textAlign="center">
        <MuiTypography variant="h2">New Manager</MuiTypography>
      </Grid>
      <Grid item xs={8} textAlign="center">
        <form>
          <CustomTextField
            size="small"
            sx={{ marginTop: '2rem' }}
            label="Manager ID"
            variant="outlined"
            value={managerId}
            onChange={(e) => setManagerId(e.target.value)}
          />
          <CustomTextField
            size="small"
            sx={{ marginTop: '2rem' }}
            label="Manager Name"
            variant="outlined"
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
          />
          <CustomTextField
            size="small"
            sx={{ marginTop: '2rem' }}
            label="email"
            variant="outlined"
            value={managerEmail}
            onChange={(e) => setManagerEmail(e.target.value)}
          />
          <CustomTextField
            size="small"
            sx={{ marginTop: '2rem' }}
            label="EmployeeIds"
            variant="outlined"
            value={empIds}
            onChange={handleEmployeeIds}
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

export default NewManagerForm
