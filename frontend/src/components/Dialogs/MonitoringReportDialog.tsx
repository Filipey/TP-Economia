import {
  CalendarMonth,
  Numbers,
  Person,
  PriceChange,
  SwapVert
} from '@mui/icons-material'
import { Button, Grid, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { ProductMonitoringResponseDTO } from '../../schemas/DTO'
import { UserService } from '../../services/http/UserService'
import { getUser } from '../../utils/sessionStorage'
import { MySnackbar } from '../Snackbar'
import { DialogTableContainer } from './DialogContainer'

interface MonitoringReportDialog {
  product: ProductMonitoringResponseDTO
  state: boolean[]
  setState(state: boolean[]): void
  index: number
}

export function MonitoringReportDialog({
  state,
  setState,
  index,
  product
}: MonitoringReportDialog) {
  const user = getUser()
  const [month, setMonth] = useState('')
  const [value, setValue] = useState(product.valor)
  const [sellings, setSellings] = useState(0)
  const [success, setSuccess] = useState(false)

  const handleSubmit = () => {
    UserService.createNewReport({
      id_produto: product.id,
      cpf_gerente: user.cpf,
      mes: month,
      vendas_realizadas: sellings,
      preco: value
    }).then(res => (res.status !== 404 ? setSuccess(true) : setSuccess(false)))
  }

  return (
    <DialogTableContainer
      state={state}
      setState={setState}
      index={index}
      dialogTitle="Novo Relatório"
    >
      <TextField
        sx={{ pb: '20px' }}
        fullWidth
        defaultValue={product.id}
        disabled
        label="ID-Produto"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Numbers />
            </InputAdornment>
          )
        }}
      />
      <TextField
        sx={{ pb: '20px' }}
        fullWidth
        defaultValue={user.cpf}
        disabled
        label="CPF"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          )
        }}
      />
      <TextField
        sx={{ pb: '20px' }}
        fullWidth
        defaultValue={month}
        label="Mês"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarMonth />
            </InputAdornment>
          )
        }}
        onChange={e => setMonth(e.target.value)}
      />
      <TextField
        sx={{ pb: '20px' }}
        fullWidth
        defaultValue={value}
        label="Preço"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PriceChange />
            </InputAdornment>
          )
        }}
        onChange={e => setValue(Number(e.target.value))}
      />
      <TextField
        sx={{ pb: '20px' }}
        fullWidth
        defaultValue={sellings}
        label="Vendas"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SwapVert />
            </InputAdornment>
          )
        }}
        onChange={e => setSellings(Number(e.target.value))}
      />
      <Grid display="flex" item justifyContent="flex-end">
        <Button onClick={handleSubmit} color="success">
          Salvar
        </Button>
      </Grid>
      <MySnackbar
        message="Relato cadastrado com sucesso! Recarregue a página"
        severity="success"
        open={success}
        setOpen={setSuccess}
      />
    </DialogTableContainer>
  )
}
