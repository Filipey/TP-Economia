import { Dashboard } from '@material-ui/icons'
import InventoryIcon from '@mui/icons-material/Inventory'
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart'
import TimelineIcon from '@mui/icons-material/Timeline'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface MyListItemProps {
  icon: JSX.Element
  url: string
  iconText: string
}

function MyListItem({ icon, url, iconText }: MyListItemProps) {
  const navigate = useNavigate()
  const handleNavigate = () => navigate(url)

  return (
    <ListItemButton onClick={handleNavigate}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={iconText} />
    </ListItemButton>
  )
}

export function DrawerListItem() {
  return (
    <List>
      <MyListItem icon={<Dashboard />} url="/dashboard" iconText="Dashboard" />
      <MyListItem
        icon={<StackedLineChartIcon />}
        url="/dashboard/charts"
        iconText="Gráficos"
      />
      <MyListItem
        icon={<InventoryIcon />}
        url="/dashboard/products"
        iconText="Produtos"
      />
      <MyListItem
        icon={<TimelineIcon />}
        url="/dashboard/monitoring"
        iconText="Monitorias"
      />
    </List>
  )
}
