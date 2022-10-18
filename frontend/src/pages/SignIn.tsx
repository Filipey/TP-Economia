import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AsideFormContainer } from '../components/AsideFormContainer'
import { WarningField } from '../components/WarningField'
import { AuthService } from '../services/http/AuthService'
import { setUser } from '../utils/sessionStorage'

export function SignIn() {
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  const [warning, setWarnig] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = () => {
    AuthService.authUser({ cpf, password }).then(res => {
      if (res.status === 201) {
        setUser(res.data)
        setWarnig(false)
        navigate('/dashboard')
      } else setWarnig(true)
    })
  }

  return (
    <AsideFormContainer>
      <TextField
        margin="normal"
        required
        fullWidth
        id="cpf"
        label="CPF"
        name="cpf"
        autoFocus
        defaultValue={cpf}
        onChange={e => setCpf(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Senha"
        type="password"
        id="password"
        defaultValue={password}
        autoComplete="current-password"
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Entrar
      </Button>
      <Grid container>
        <Grid item>
          <Link
            sx={{ cursor: 'pointer', textDecoration: 'none' }}
            onClick={() => navigate('/sign-up')}
          >
            Não possui uma conta? Registre-se!
          </Link>
        </Grid>
      </Grid>
      <>
        {warning && (
          <WarningField
            title="CPF ou senha inválidos"
            severity="error"
            message="CPF ou senha digitada são inválidos"
          />
        )}
      </>
    </AsideFormContainer>
  )
}
