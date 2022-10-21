import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip
} from '@material-ui/core'
import { History } from '@material-ui/icons'
import { Assignment, Insights } from '@mui/icons-material'
import { Grid, IconButton, Paper, Table, TablePagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ProductMonitoringResponseDTO } from '../../schemas/DTO'
import { UserService } from '../../services/http/UserService'
import { formatNumberToLocale } from '../../utils/formatters'
import { getUser } from '../../utils/sessionStorage'
import { MonitoringDialog } from '../Dialogs/MonitoringDialog'
import { MonitoringReportDialog } from '../Dialogs/MonitoringReportDialog'
import { ReportsHistoryDialog } from '../Dialogs/ReportsHistoryDialog'
import { TableTitle } from './TableTitle'

export function MonitoringTable() {
  const [openNewMonitoringModal, setOpenNewMonitoringModal] = useState(false)
  const [products, setProducts] = useState<ProductMonitoringResponseDTO[]>([])
  const [atualProducts, setAtualProducts] = useState<
    ProductMonitoringResponseDTO[]
  >([])
  const [openReportsModal, setOpenReportsModal] = useState(
    Array(products.length).fill(false)
  )
  const [openHistoryModal, setOpenHistoryModal] = useState(
    Array(products.length).fill(false)
  )
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleOpenReportsModal = (index: number) =>
    setOpenReportsModal(
      openReportsModal.map((s, pos) => (pos === index ? true : s))
    )

  const handleOpenHistoryModal = (index: number) =>
    setOpenHistoryModal(
      openReportsModal.map((s, pos) => (pos === index ? true : s))
    )

  function fetchData() {
    const user = getUser()
    UserService.getUserMonitoringProducts(user.cpf).then(res =>
      setProducts(res.data)
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setAtualProducts(products)
    setOpenReportsModal(Array(products.length).fill(false))
    setOpenHistoryModal(Array(products.length).fill(false))
  }, [products])

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

  return (
    <Grid style={{ width: '100%' }} item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <TableTitle
          title="Produtos Monitorados"
          buttonTitle="Monitorar Produto"
          steps={[
            { title: 'Dashboard', url: '/' },
            { title: 'Monitorias', url: '/monitoring' }
          ]}
          handleAction={() => setOpenNewMonitoringModal(true)}
        >
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Marca</TableCell>
                <TableCell align="center">Estoque</TableCell>
                <TableCell align="center">Análises</TableCell>
                <TableCell align="center">Relatar</TableCell>
                <TableCell align="center">Histórico</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {atualProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, index) => (
                  <React.Fragment key={product.id}>
                    <TableRow>
                      <TableCell align="center">{product.nome}</TableCell>
                      <TableCell align="center">{product.marca}</TableCell>
                      <TableCell align="center">
                        {formatNumberToLocale(product.estoque)}
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Análises">
                          <IconButton>
                            <Insights />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Relatar">
                          <IconButton
                            onClick={() => handleOpenReportsModal(index)}
                          >
                            <Assignment />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Histórico">
                          <IconButton
                            onClick={() => handleOpenHistoryModal(index)}
                          >
                            <History />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                    <MonitoringReportDialog
                      state={openReportsModal}
                      setState={setOpenReportsModal}
                      product={product}
                      index={index}
                    />
                    <ReportsHistoryDialog
                      state={openHistoryModal}
                      setState={setOpenHistoryModal}
                      product={product}
                      index={index}
                    />
                  </React.Fragment>
                ))}
              <MonitoringDialog
                state={openNewMonitoringModal}
                setState={setOpenNewMonitoringModal}
              />
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
        </TableTitle>
      </Paper>
    </Grid>
  )
}
