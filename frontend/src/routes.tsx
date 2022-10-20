import { ThemeProvider } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { DashboardPage } from './pages/Dashboard'
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
      </Routes>
    </ThemeProvider>
  )
}
