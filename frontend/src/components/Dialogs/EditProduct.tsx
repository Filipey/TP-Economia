import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'
import { useState } from 'react'
import { MySnackbar } from '../Snackbar'

import { useTheme } from '@material-ui/core'
import {
  AttachMoney,
  BrandingWatermark,
  Close,
  DriveFileRenameOutline,
  Numbers
} from '@mui/icons-material'
import { ProductResponseDTO } from '../../schemas/DTO'
import { ProductService } from '../../services/http/ProductService'

interface EditProductDialogProps {
  state: boolean[]
  setState(state: boolean[]): void
  product: ProductResponseDTO
  index: number
}

export function EditProductDialog({
  state,
  setState,
  product,
  index
}: EditProductDialogProps) {
  const [name, setName] = useState(product.nome)
  const [brand, setBrand] = useState(product.marca)
  const [inventory, setInventory] = useState(product.estoque)
  const [value, setValue] = useState(product.valor)
  const [success, setSuccess] = useState(false)
  const theme = useTheme()

  const handleCloseModal = (index: number) =>
    setState(state.map((s, pos) => (pos === index ? !s : s)))

  const handleSubmit = () => {
    ProductService.updateProduct(product.id, {
      name,
      brand,
      inventory,
      value
    }).then(res => (res.status !== 404 ? setSuccess(true) : setSuccess(false)))
  }

  return (
    <Dialog open={state[index]} scroll="body" fullWidth>
      <DialogTitle color={theme.palette.grey[400]}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>{`Editar ${product.nome} ${product.marca}`}</Grid>
          <Grid item>
            <IconButton
              sx={{ size: 'small' }}
              onClick={() => handleCloseModal(index)}
            >
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid container flexDirection="column" item sx={{ pt: 2 }}>
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
              <Button
                onClick={handleSubmit}
                color="success"
                variant="contained"
              >
                Salvar
              </Button>
            </Grid>
            <MySnackbar
              message="Produto atualizado com sucesso! Recarregue a página"
              severity="info"
              open={success}
              setOpen={setSuccess}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
