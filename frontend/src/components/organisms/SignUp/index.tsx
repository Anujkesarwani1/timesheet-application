import { Button, Grid } from '@mui/material'
import CustomTextField from 'components/atoms/Input'
import MuiTypography from 'components/atoms/Typography'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_API } from 'services/api'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const navigate = useNavigate()

  const isAnyInputEmpty = () => {
    return email === '' || password === '' || role === ''
  }

  const handleSignUp = async () => {
    if (isAnyInputEmpty()) {
      console.error('Please fill in all the fields before submitting.')
      return
    }
    try {
      const formData = {
        email,
        password,
        role,
      }

      const response = await MOCK_API.post('/users', formData)

      if (response.status === 201) {
        setEmail('')
        setPassword('')
        setRole('')
        navigate('/')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
    >
      <Grid item>
        <MuiTypography variant="h2">Welcome New User</MuiTypography>
      </Grid>

      <Grid item>
        <form>
          <CustomTextField
            sx={{ marginTop: '2rem' }}
            label="Email"
            variant="outlined"
            type="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomTextField
            sx={{ marginTop: '2rem' }}
            label="Create Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomTextField
            sx={{ marginTop: '2rem' }}
            label="Role"
            variant="outlined"
            type="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </form>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={handleSignUp}
          sx={{
            marginTop: '2rem',
            marginBottom: '2rem',
          }}
          disabled={isAnyInputEmpty()}
          size="large"
        >
          SignUp
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{
            marginTop: '2rem',
            marginBottom: '2rem',
            marginLeft: '2rem',
          }}
          size="large"
          disabled={!isAnyInputEmpty()}
        >
          LogIn
        </Button>
      </Grid>
    </Grid>
  )
}

export default SignUp
