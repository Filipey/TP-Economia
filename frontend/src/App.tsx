import { Button, Container, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { api } from './services/api'

export function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    handleGetMessage
  }, [])

  const handleGetMessage = () => {
    api.get('/api/v1').then(res => setMessage(res.data))
  }

  return (
    <>
      <Container style={{ width: '100%', height: '100%' }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h1">
              Rode o servidor para ver a mensagem
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              {message ? message : 'Erro ao fazer o request'}
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleGetMessage}>
              Tentar obter resposta do servidor
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
