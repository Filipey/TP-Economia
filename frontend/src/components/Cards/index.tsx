import { Inventory, StackedLineChart } from '@mui/icons-material'
import { Container, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserService } from '../../services/http/UserService'
import { getUser } from '../../utils/sessionStorage'
import { Card } from './CardModel'

export function Cards() {
  const navigate = useNavigate()
  const [products, setProducts] = useState(0)
  const [monitoringProducts, setMonitoringProducts] = useState(0)
  const user = getUser()

  function fetchData() {
    UserService.countUserProducts(user.cpf).then(res =>
      setProducts(res.data.count)
    )
    UserService.countUserMonitoringProducts(user.cpf).then(res =>
      setMonitoringProducts(res.data.count)
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleClickProducts = () => navigate('/dashboard/products')
  const handleClickMonitoringProducts = () => navigate('/dashboard/monitoring')
  const handleClickCharts = () => navigate('/dashboard/charts')

  return (
    <Container
      style={{ paddingRight: '0px', width: '100%', paddingTop: '36px' }}
    >
      <Grid spacing={3} container>
        <Grid item style={{ width: '50%' }}>
          <Card
            title="Produtos"
            icon={<Inventory />}
            value={products.toString()}
            iconColor="gold"
            details="Cadastrados"
            onClick={handleClickProducts}
          />
        </Grid>
        <Grid item style={{ width: '50%' }}>
          <Card
            title="Monitoramentos"
            icon={<StackedLineChart />}
            value={monitoringProducts.toString()}
            iconColor="gray"
            details="Monitorados"
            onClick={handleClickMonitoringProducts}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
