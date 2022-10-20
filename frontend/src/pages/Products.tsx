import { DashboardContainer } from '../components/Dashboard/Container'
import { DashboardContentContainer } from '../components/Dashboard/ContentContainer'
import { ProductsTable } from '../components/Tables/ProductsTable'

export function ProductsPage() {
  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <ProductsTable mode="all" />
      </DashboardContentContainer>
    </DashboardContainer>
  )
}
