import { Grid } from '@mui/material'
import { ProductMonitoringResponseDTO } from '../../schemas/DTO'
import { EmphasisMonth } from '../Charts/EmphasisMonth'
import { PriceByMonth } from '../Charts/PriceByMonth'
import { SupplyDemand } from '../Charts/SupplyDemand'
import { DialogTableContainer } from './DialogContainer'

interface AnalyticsDialog {
  product: ProductMonitoringResponseDTO
  state: boolean[]
  setState(state: boolean[]): void
  index: number
}

export function AnalyticsDialog({
  product,
  state,
  setState,
  index
}: AnalyticsDialog) {
  return (
    <DialogTableContainer
      state={state}
      setState={setState}
      index={index}
      dialogTitle="Análises"
    >
      <Grid item>
        <SupplyDemand product={product} />
      </Grid>
      <Grid item sx={{ mt: 2 }}>
        <PriceByMonth product={product} />
      </Grid>
      <Grid item sx={{ mt: 2 }}>
        <EmphasisMonth product={product} />
      </Grid>
    </DialogTableContainer>
  )
}
