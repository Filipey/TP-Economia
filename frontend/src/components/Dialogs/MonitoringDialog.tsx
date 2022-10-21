import {
  Event,
  EventRepeat,
  Numbers,
  Person,
  SwapVert,
  Update
} from '@mui/icons-material'
import { Button, Grid, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { UserService } from '../../services/http/UserService'
import { getUser } from '../../utils/sessionStorage'
import { MySnackbar } from '../Snackbar'
import { BasicDialogProps, DialogContainer } from './DialogContainer'

export function MonitoringDialog({ state, setState }: BasicDialogProps) {
  const user = getUser()
  const [productId, setProductId] = useState(0)
  const [userCpf] = useState(user.cpf)
  const [initialDate, setInitialDate] = useState(new Date())
  const [finalDate, setFinalDate] = useState(new Date())
  const [sellingsXp, setSellingXp] = useState(0)
  const [sellings, setSellings] = useState(0)
  const [success, setSuccess] = useState(false)

  const handleSubmit = () => {
    UserService.createNewMonitoring({
      idProduct: productId,
      userCpf,
      initialDate,
      finalDate,
      sellingsXp,
      sellings
    }).then(res => (res.status !== 404 ? setSuccess(true) : setSuccess(false)))
  }

  return (
    <DialogContainer
      state={state}
      setState={setState}
      dialogTitle="Nova Monitoria"
    >
      <TextField
        sx={{ pb: '20px' }}
        fullWidth
        defaultValue={productId}
        label="ID-Produto"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Numbers />
            </InputAdornment>
          )
        }}
        onChange={e => setProductId(Number(e.target.value))}
      />
      <TextField
        sx={{ pb: '20px' }}
        fullWidth
        defaultValue={userCpf}
        label="CPF"
        disabled
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
        defaultValue={initialDate}
        label="Data de Início"
        type="date"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Event />
            </InputAdornment>
          )
        }}
        onChange={e => setInitialDate(e.target.value as unknown as Date)}
      />
      <TextField
        sx={{ pb: '20px' }}
        fullWidth
        defaultValue={finalDate}
        label="Data de Término"
        type="date"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EventRepeat />
            </InputAdornment>
          )
        }}
        onChange={e => setFinalDate(e.target.value as unknown as Date)}
      />
      <TextField
        sx={{ pb: '20px' }}
        fullWidth
        defaultValue={sellingsXp}
        label="Expectativa de Vendas"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SwapVert />
            </InputAdornment>
          )
        }}
        onChange={e => setSellingXp(Number(e.target.value))}
      />
      <TextField
        sx={{ pb: '20px' }}
        fullWidth
        defaultValue={sellings}
        label="Vendas Atuais"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Update />
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
        message="Monitoria cadastrada com sucesso! Recarregue a página"
        severity="success"
        open={success}
        setOpen={setSuccess}
      />
    </DialogContainer>
  )
}
