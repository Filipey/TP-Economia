import { Cards } from '../components/Cards'
import { DashboardContainer } from '../components/Dashboard/Container'
import { DashboardContentContainer } from '../components/Dashboard/ContentContainer'

export function DashboardPage() {
  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <Cards />
      </DashboardContentContainer>
    </DashboardContainer>
  )
}
