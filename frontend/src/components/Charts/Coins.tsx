import { Divider, Grid, Paper, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { CoinsService } from '../../services/http/CoinsService'

export function CoinsCharts() {
  const [data, setData] = useState<any>()
  const theme = useTheme()

  useEffect(() => {
    CoinsService.getCoins().then(res => {
      setData(res.data)
    })
  }, [])

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
          {`Estados das Moedas`}
        </Typography>
      </Paper>
      <Divider />
    </Grid>
  )
}
