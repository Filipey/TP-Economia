import { Alert, Snackbar } from '@mui/material'

interface MySnackbarProps {
  setOpen(open: boolean): void
  open: boolean
  message: string
  severity: 'error' | 'warning' | 'info' | 'success'
}

export function MySnackbar({
  open,
  message,
  severity,
  setOpen
}: MySnackbarProps) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Snackbar open={open} autoHideDuration={600} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
