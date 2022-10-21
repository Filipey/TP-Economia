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

interface SupplyDemandProps {
  product: ProductMonitoringResponseDTO
}

export type SupplyDemandGraphic = {
  inventory: number
  sales: number
  month: string
  value: number
}

export function SupplyDemand({ product }: SupplyDemandProps) {
  const theme = useTheme()
  const [reports, setReports] = useState<ReportDTO[]>([])
  const [months, setMonths] = useState<string[]>([])
  const [inventory, setInventory] = useState(product.estoque)
  const [data, setData] = useState<SupplyDemandGraphic[]>([])

  function fetchData() {
    const user = getUser()
    ProductService.getProductReports(product.id, user.cpf).then(res =>
      setReports(res.data)
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setMonths(reports.map(report => report.mes))
    const extract = reports.map(function (report) {
      return {
        sales: report.vendas_realizadas,
        month: report.mes,
        value: report.preco
      }
    })
    const rawData = extract.map(function (extract, index) {
      const inventory = product.estoque - index * extract.sales
      return {
        inventory: inventory,
        sales: extract.sales,
        month: extract.month,
        value: extract.value
      }
    })

    setData(rawData)
  }, [reports])

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
          onClick={() => console.log(data)}
        >
          {`Oferta X Demanda: ${product.nome} ${product.marca}`}
        </Typography>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart data={data} width={800} height={300}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis dataKey="inventory" />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Line
              name="Oferta"
              dataKey="inventory"
              fill={theme.palette.primary.dark}
            />
            <Line
              name="Demanda"
              dataKey="sales"
              fill={theme.palette.primary.dark}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
      <Divider />
    </Grid>
  )
}
