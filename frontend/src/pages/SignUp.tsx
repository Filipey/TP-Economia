import { Button, Grid, Link, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AsideFormContainer } from '../components/AsideFormContainer'
import { WarningField } from '../components/WarningField'
import { AuthService } from '../services/http/AuthService'

export function SignUp() {
  const [cpf, setCpf] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  const validateFields =
    cpf !== '' &&
    name !== '' &&
    email !== '' &&
    telephone !== '' &&
    password !== '' &&
    passwordConfirm !== '' &&
    password === passwordConfirm

  const handleSubmit = () => {
    validateFields
      ? AuthService.createUser({
          cpf,
          name,
          email,
          telephone,
          password
        }).then(res => (res.status === 201 ? setSuccess(true) : setError(true)))
      : setError(true)
  }

  return (
    <AsideFormContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            fullWidth
            required
            id="CPF"
            label="CPF"
            name="CPF"
            autoComplete="cpf"
            defaultValue={cpf}
            onChange={e => setCpf(e.target.value)}
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            margin="normal"
            required
            name="name"
            label="Nome"
            type="name"
            defaultValue={name}
            onChange={e => setName(e.target.value)}
            id="name"
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
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
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
            defaultValue={telephone}
            onChange={e => setTelephone(e.target.value)}
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
            defaultValue={password}
            onChange={e => setPassword(e.target.value)}
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
            defaultValue={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
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
            sx={{ cursor: 'pointer', textDecoration: 'none', color: 'black' }}
            onClick={() => navigate('/')}
          >
            Já possui uma conta? Entre aqui
          </Link>
        </Grid>
      </Grid>
      <>
        {success && !error && (
          <WarningField
            title="Usuário criado com sucesso!"
            message="Volte para a tela de Login para acessar o Alligator!"
            severity="success"
          />
        )}
        {error && !success && (
          <WarningField
            title="Entrada de dados inválidas!"
            message="Verifique novamente os dados digitados"
            severity="error"
          />
        )}
      </>
    </AsideFormContainer>
  )
}
