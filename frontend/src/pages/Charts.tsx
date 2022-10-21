import { CoinsCharts } from '../components/Charts/Coins'
import { DashboardContainer } from '../components/Dashboard/Container'
import { DashboardContentContainer } from '../components/Dashboard/ContentContainer'

export function ChartsPage() {
  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <CoinsCharts />
      </DashboardContentContainer>
    </DashboardContainer>
  )
}
