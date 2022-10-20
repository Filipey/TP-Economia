import {
  AttachMoney,
  BrandingWatermark,
  DriveFileRenameOutline,
  Numbers
} from '@mui/icons-material'
import { Button, Grid, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { ProductService } from '../../services/http/ProductService'
import { getUser } from '../../utils/sessionStorage'
import { MySnackbar } from '../Snackbar'
import { BasicDialogProps, DialogContainer } from './DialogContainer'

export function ProductDialog({ state, setState }: BasicDialogProps) {
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [value, setValue] = useState<number>(0)
  const [inventory, setInventory] = useState<number>(0)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = () => {
    const user = getUser()
    ProductService.postNewProdut(user.cpf, {
      name,
      brand,
      value,
      inventory
    }).then(res => (res.status === 201 ? setSuccess(true) : setError(true)))
  }

  return (
    <DialogContainer
      dialogTitle="Novo Produto"
      state={state}
      setState={setState}
    >
      <TextField
        sx={{ pb: '20px' }}
        fullWidth
        defaultValue={name}
        label="Nome"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DriveFileRenameOutline />
            </InputAdornment>
          )
        }}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        sx={{ pb: '20px' }}
        fullWidth
        defaultValue={brand}
        label="Marca"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <BrandingWatermark />
            </InputAdornment>
          )
        }}
        onChange={e => setBrand(e.target.value)}
      />
      <TextField
        sx={{ pb: '20px' }}
        fullWidth
        defaultValue={value}
        label="Valor"
        type="number"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AttachMoney />
            </InputAdornment>
          )
        }}
        onChange={e => setValue(Number(e.target.value))}
      />
      <TextField
        sx={{ pb: '20px' }}
        fullWidth
        defaultValue={inventory}
        label="Estoque"
        type="number"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Numbers />
            </InputAdornment>
          )
        }}
        onChange={e => setInventory(Number(e.target.value))}
      />
      <Grid display="flex" item justifyContent="flex-end">
        <Button onClick={handleSubmit} color="success">
          Salvar
        </Button>
      </Grid>
      <MySnackbar
        message="Produto cadastrado com sucesso! Recarregue a página"
        severity="success"
        open={success}
        setOpen={setSuccess}
      />
      <MySnackbar
        message="Erro ao cadastrar o produto! Verifique os campos"
        severity="error"
        open={error}
        setOpen={setError}
      />
    </DialogContainer>
  )
}
