import { useTheme } from '@material-ui/core'
import { Divider, Grid, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { ProductMonitoringResponseDTO, ReportDTO } from '../../schemas/DTO'
import { ProductService } from '../../services/http/ProductService'
import { getUser } from '../../utils/sessionStorage'

interface PriceByMonthProps {
  product: ProductMonitoringResponseDTO
}

export function PriceByMonth({ product }: PriceByMonthProps) {
  const theme = useTheme()
  const [reports, setReports] = useState<ReportDTO[]>([])

  function fetchData() {
    const user = getUser()
    ProductService.getProductReports(product.id, user.cpf).then(res =>
      setReports(res.data)
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
          onClick={() => console.log(reports)}
        >
          {`Variação de Valor: ${product.nome} ${product.marca}`}
        </Typography>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart data={reports} width={800} height={300}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis dataKey="preco" />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Line name="Mês" dataKey="mes" fill={theme.palette.primary.dark} />
            <Line
              name="Valor"
              dataKey="preco"
              fill={theme.palette.primary.dark}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
      <Divider />
    </Grid>
  )
}
