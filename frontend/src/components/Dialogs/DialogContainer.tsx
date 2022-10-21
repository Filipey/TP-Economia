import { Dialog, DialogTitle } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import {
  DialogContent,
  Divider,
  Grid,
  IconButton,
  useTheme
} from '@mui/material'
import { ReactNode } from 'react'

export interface BasicDialogProps {
  state: boolean
  setState(state: boolean): void
}

interface DialogContainerProps extends BasicDialogProps {
  children: ReactNode[]
  dialogTitle: string
}

export function DialogContainer({
  state,
  setState,
  children,
  dialogTitle
}: DialogContainerProps) {
  const theme = useTheme()

  return (
    <Dialog open={state} scroll="body" fullWidth>
      <DialogTitle color={theme.palette.grey[400]}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>{dialogTitle}</Grid>
          <Grid item>
            <IconButton sx={{ size: 'small' }} onClick={() => setState(false)}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid container flexDirection="column" item sx={{ pt: 2 }}>
            {children}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export interface DialogTableContainerProps {
  state: boolean[]
  setState(state: boolean[]): void
  dialogTitle: string
  children: ReactNode[] | ReactNode
  index: number
}

export function DialogTableContainer({
  state,
  setState,
  dialogTitle,
  children,
  index
}: DialogTableContainerProps) {
  const theme = useTheme()
  const handleCloseDialog = (index: number) =>
    setState(state.map((s, pos) => (pos === index ? false : s)))

  return (
    <Dialog open={state[index]} scroll="body" fullWidth>
      <DialogTitle color={theme.palette.grey[400]}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>{dialogTitle}</Grid>
          <Grid item>
            <IconButton
              sx={{ size: 'small' }}
              onClick={() => handleCloseDialog(index)}
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
            {children}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
