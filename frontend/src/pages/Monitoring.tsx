import { DashboardContainer } from '../components/Dashboard/Container'
import { DashboardContentContainer } from '../components/Dashboard/ContentContainer'
import { MonitoringTable } from '../components/Tables/MonitoringTable'

export function MonitoringPage() {
  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <MonitoringTable />
      </DashboardContentContainer>
    </DashboardContainer>
  )
}
