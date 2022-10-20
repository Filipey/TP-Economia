import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductResponseDTO } from '../../schemas/DTO'
import { ProductService } from '../../services/http/ProductService'
import { UserService } from '../../services/http/UserService'
import {
  formatNumberToCurrency,
  formatNumberToLocale
} from '../../utils/formatters'
import { getUser } from '../../utils/sessionStorage'

interface ProductsTableProps {
  mode: 'all' | 'home'
}

export function ProductsTable({ mode }: ProductsTableProps) {
  const navigate = useNavigate()
  const theme = useTheme()
  const [products, setProducts] = useState<ProductResponseDTO[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    setPage(page)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value))
    setPage(0)
  }

  function fetchData() {
    const user = getUser()
    mode === 'home'
      ? ProductService.getProductsChartHomeData(user.cpf).then(res =>
          setProducts(res.data)
        )
      : UserService.getUserProducts(user.cpf).then(res => setProducts(res.data))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Grid style={{ width: '100%' }} item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography
          component="h2"
          variant="h6"
          color={theme.palette.info.light}
          gutterBottom
        >
          Últimos Produtos
        </Typography>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Marca</TableCell>
              <TableCell align="center">Valor</TableCell>
              <TableCell align="center">Estoque</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow
                onClick={() => console.log(product)}
                hover={true}
                key={product.id}
              >
                <TableCell align="center">{product.nome}</TableCell>
                <TableCell align="center">{product.marca}</TableCell>
                <TableCell align="center">
                  {formatNumberToCurrency(product.valor)}
                </TableCell>
                <TableCell align="center">
                  {formatNumberToLocale(product.estoque)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {mode === 'home' ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              pt: 1
            }}
          >
            <Button
              color="info"
              endIcon={<ArrowRightIcon fontSize="small" />}
              size="small"
              variant="text"
              onClick={() => navigate('/dashboard/products')}
            >
              Ver todos
            </Button>
          </Box>
        ) : (
          <TablePagination
            component="div"
            sx={{ justifyContent: 'flex-end' }}
            count={products.length}
            page={page}
            labelRowsPerPage="Dados por página"
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 15]}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Grid>
  )
}
