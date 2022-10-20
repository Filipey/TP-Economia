import { Divider, Grid, Paper, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { ProductResponseDTO } from '../../schemas/DTO'
import { ProductService } from '../../services/http/ProductService'
import { getUser } from '../../utils/sessionStorage'

export function HomeChart() {
  const theme = useTheme()
  const [products, setProducts] = useState<ProductResponseDTO[]>([])

  function fetchData() {
    const user = getUser()
    ProductService.getProductsChartHomeData(user.cpf).then(res =>
      setProducts(res.data)
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Grid item style={{ width: '100%' }}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography
          component="h2"
          variant="h6"
          color={theme.palette.info.light}
          gutterBottom
          onClick={() => console.log(products)}
        >
          Meus Produtos - Valor x Estoque
        </Typography>
        <ResponsiveContainer width="100%" aspect={3}>
          <BarChart data={products} width={500} height={300}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" />
            <YAxis dataKey="valor" />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar dataKey="valor" fill={theme.palette.primary.dark} />
            <Bar dataKey="estoque" fill={theme.palette.grey[400]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
      <Divider />
    </Grid>
  )
}
