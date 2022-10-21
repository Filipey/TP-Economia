import { ProductResponseDTO } from '../../schemas/DTO'
import { ReserveProductsChart } from '../Charts/ReserveProductsChart'
import { DialogTableContainer } from './DialogContainer'

interface ReserveProductDialog {
  product: ProductResponseDTO
  state: boolean[]
  setState(state: boolean[]): void
  index: number
}

export function ReserveProductDialog({
  state,
  setState,
  index,
  product
}: ReserveProductDialog) {
  return (
    <DialogTableContainer
      state={state}
      setState={setState}
      dialogTitle="Produtos Substitutos"
      index={index}
    >
      <ReserveProductsChart product={product} />
    </DialogTableContainer>
  )
}
