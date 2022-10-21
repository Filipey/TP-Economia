import { useTheme } from '@material-ui/core'
import { Divider, Grid, Paper, Typography } from '@mui/material'
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
import { ProductMonitoringResponseDTO, ReportDTO } from '../../schemas/DTO'
import { ProductService } from '../../services/http/ProductService'
import { getUser } from '../../utils/sessionStorage'

interface EmphasisMonthProps {
  product: ProductMonitoringResponseDTO
}

type Emphasis = {
  month: string
  price: number
  sellings: number
}

export function EmphasisMonth({ product }: EmphasisMonthProps) {
  const theme = useTheme()
  const [reports, setReports] = useState<ReportDTO[]>([])
  const [data, setData] = useState<Emphasis[]>([])

  function fetchData() {
    const user = getUser()
    ProductService.getProductReports(product.id, user.cpf).then(res =>
      setReports(res.data)
    )
  }

  useEffect(() => {
    const emphasis: Emphasis[] = reports.map(function (report) {
      let month = report.mes
      const price = report.preco
      if (report.mes === '') month = 'Inicial'
      return {
        month: month,
        price: price,
        sellings: report.vendas_realizadas
      }
    })

    setData(emphasis)
  }, [reports])

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
          {`Períodos em Destaque: ${product.nome} ${product.marca}`}
        </Typography>
        <ResponsiveContainer width="100%" aspect={3}>
          <BarChart data={data} width={800} height={300}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis dataKey="sellings" />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar
              name="Vendas Realizadas"
              dataKey="sellings"
              fill={theme.palette.primary.dark}
            />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
      <Divider />
    </Grid>
  )
}
