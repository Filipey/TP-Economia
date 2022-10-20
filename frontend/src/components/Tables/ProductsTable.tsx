import { Delete, Edit, QueryStats } from '@mui/icons-material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
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
import { ProductDialog } from '../Dialogs/ProductDialog'
import { MySnackbar } from '../Snackbar'
import { TableTitle } from './TableTitle'

interface ProductsTableProps {
  mode: 'all' | 'home'
}

export function ProductsTable({ mode }: ProductsTableProps) {
  const navigate = useNavigate()
  const theme = useTheme()
  const [products, setProducts] = useState<ProductResponseDTO[]>([])
  const [openProductModal, setOpenProductModal] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [successDelete, setSuccesDelete] = useState(false)

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

  const handleDeleteProduct = (productId: number) => {
    ProductService.deleteProduct(productId).then(res =>
      res.status !== 404 ? setSuccesDelete(true) : setSuccesDelete(false)
    )
  }

  function fetchData() {
    const user = getUser()
    mode === 'home'
      ? ProductService.getUserLastProducts(user.cpf).then(res =>
          setProducts(res.data)
        )
      : UserService.getUserProducts(user.cpf).then(res => setProducts(res.data))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Grid style={{ width: '100%', marginTop: 4 }} item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        {mode === 'home' ? (
          <>
            <Typography
              component="h2"
              variant="h6"
              color={theme.palette.info.light}
              gutterBottom
            >
              Últimos 5 Produtos cadastrados
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
                  <TableRow key={product.id}>
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
          </>
        ) : (
          <TableTitle
            title="Meus Produtos"
            buttonTitle="Adicionar Produto"
            steps={[
              { title: 'Dashboard', url: '/' },
              { title: 'Meus Produtos', url: '/dashboard/products' }
            ]}
            handleAction={() => setOpenProductModal(true)}
          >
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Marca</TableCell>
                  <TableCell align="center">Valor</TableCell>
                  <TableCell align="center">Estoque</TableCell>
                  <TableCell align="center">Oferta e Demanda</TableCell>
                  <TableCell align="center">Editar</TableCell>
                  <TableCell align="center">Deletar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(product => (
                  <TableRow key={product.id}>
                    <TableCell align="center">{product.nome}</TableCell>
                    <TableCell align="center">{product.marca}</TableCell>
                    <TableCell align="center">
                      {formatNumberToCurrency(product.valor)}
                    </TableCell>
                    <TableCell align="center">
                      {formatNumberToLocale(product.estoque)}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Oferta e Demanda">
                        <IconButton>
                          <QueryStats htmlColor="#76BA99" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Editar">
                        <IconButton>
                          <Edit color="info" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Deletar">
                        <IconButton
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Delete color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
            <ProductDialog
              state={openProductModal}
              setState={setOpenProductModal}
            />
            <MySnackbar
              open={successDelete}
              setOpen={setSuccesDelete}
              message="Produto deletado com sucesso! Recarregue a página"
              severity="success"
            />
          </TableTitle>
        )}
      </Paper>
    </Grid>
  )
}
