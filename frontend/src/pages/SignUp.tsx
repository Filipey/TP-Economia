import { Button, Grid, Link, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AsideFormContainer } from '../components/AsideFormContainer'

export function SignUp() {
  const navigate = useNavigate()

  const handleSubmit = () => {
    console.log('submit')
  }

  return (
    <AsideFormContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            fullWidth
            required
            id="name"
            label="Nome"
            name="name"
            autoComplete="name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            margin="normal"
            required
            name="surname"
            label="Sobrenome"
            type="name"
            id="surname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            margin="normal"
            required
            name="email"
            label="Email"
            type="email"
            id="email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            margin="normal"
            required
            name="telephone"
            label="Telefone"
            type="tel"
            id="tel"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            fullWidth
            name="password-confirm"
            label="Confirme sua Senha"
            type="password"
            id="password-confirm"
          />
        </Grid>
      </Grid>
      <Button
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Registrar
      </Button>
      <Grid container>
        <Grid item>
          <Link
            sx={{ cursor: 'pointer', textDecoration: 'none' }}
            onClick={() => navigate('/')}
          >
            Já possui uma conta? Entre aqui
          </Link>
        </Grid>
      </Grid>
    </AsideFormContainer>
  )
}
