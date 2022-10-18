import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'
import { AsideFormContainer } from '../components/AsideFormContainer'

export function SignIn() {
  const navigate = useNavigate()

  const handleSubmit = () => {
    console.log('submit')
  }

  return (
    <AsideFormContainer>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Senha"
        type="password"
        id="password"
        autoComplete="current-password"
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
    </AsideFormContainer>
  )
}
