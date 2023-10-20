import { Grid, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import MuiTypography from '../../atoms/Typography'
import CustomTextField from '../../atoms/Input'
import Button from '../../atoms/Button'
import { MOCK_API } from 'services/api'
import { useNavigate } from 'react-router-dom'

type UserData = {
  email: string
  password: string
  role: string
}

const AuthComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [data, setData] = useState<UserData[]>([])
  const navigate = useNavigate()

  const isAnyInputEmpty = () => {
    return email === '' || password === ''
  }

  console.log(email, password)
  function findUserByEmailAndPassword() {
    const findData = data.find(
      (user: any) => user.email === email && user.password === password
    )
    if (findData) {
      localStorage.setItem('email', findData.email)
      if (findData.role === 'admin') {
        navigate('/admin')
      } else if (findData.role === 'manager') {
        navigate('/manager')
      } else {
        navigate('/employee')
      }
    }
    console.log(findData)
  }

  const getApiData = async () => {
    try {
      const response = await MOCK_API.get('/users')
      setData(response.data)
    } catch (error: any) {
      console.log('error')
    }
  }

  useEffect(() => {
    getApiData()
  }, [])
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Grid item>
        <MuiTypography variant="h2">Login</MuiTypography>
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
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <Grid item textAlign="center">
          <Button
            variant="contained"
            onClick={findUserByEmailAndPassword}
            sx={{
              marginTop: '2rem',
              marginBottom: '2rem',
            }}
            size="large"
            disabled={isAnyInputEmpty()}
          >
            Login
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/signup')}
            sx={{
              marginTop: '2rem',
              marginBottom: '2rem',
              marginLeft: '2rem',
            }}
            size="large"
            disabled={!isAnyInputEmpty()}
          >
            SignUp
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AuthComponent
