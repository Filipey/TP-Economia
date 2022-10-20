import { Cards } from '../components/Cards'
import { HomeChart } from '../components/Charts/HomeChart'
import { DashboardContainer } from '../components/Dashboard/Container'
import { DashboardContentContainer } from '../components/Dashboard/ContentContainer'
import { ProductsTable } from '../components/Tables/ProductsTable'

export function DashboardPage() {
  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <Cards />
        <HomeChart />
        <ProductsTable mode="home" />
      </DashboardContentContainer>
    </DashboardContainer>
  )
}
