import { Inventory } from '@mui/icons-material'
import { Container, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Card } from './CardModel'

export function Cards() {
  const navigate = useNavigate()

  const handleClickProducts = () => navigate('/dashboard/products')

  return (
    <Container
      style={{ paddingRight: '0px', width: '100%', paddingTop: '36px' }}
    >
      <Grid spacing={3} container>
        <Grid item style={{ width: '33.3%' }}>
          <Card
            title="Produtos"
            icon={<Inventory />}
            isUpper
            value="300"
            iconColor="gold"
            details="Teste"
            onClick={handleClickProducts}
          />
        </Grid>
        <Grid item style={{ width: '33.3%' }}>
          <Card
            title="Produtos"
            icon={<Inventory />}
            isUpper
            value="300"
            iconColor="gold"
            details="Teste"
            onClick={handleClickProducts}
          />
        </Grid>
        <Grid item style={{ width: '33.3%' }}>
          <Card
            title="Produtos"
            icon={<Inventory />}
            isUpper
            value="300"
            iconColor="gold"
            details="Teste"
            onClick={handleClickProducts}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
