import { ProductMonitoringResponseDTO } from '../../schemas/DTO'
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
      <SupplyDemand product={product} />
    </DialogTableContainer>
  )
}
