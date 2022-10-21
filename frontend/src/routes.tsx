import { ThemeProvider } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { ChartsPage } from './pages/Charts'
import { DashboardPage } from './pages/Dashboard'
import { MonitoringPage } from './pages/Monitoring'
import { ProductsPage } from './pages/Products'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { theme } from './utils/theme'

export function Router() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/products" element={<ProductsPage />} />
        <Route path="/dashboard/monitoring" element={<MonitoringPage />} />
        <Route path="/dashboard/charts" element={<ChartsPage />} />
      </Routes>
    </ThemeProvider>
  )
}
