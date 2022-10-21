import { ExpandMore, Numbers, PriceChange } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ProductMonitoringResponseDTO, ReportDTO } from '../../schemas/DTO'
import { ProductService } from '../../services/http/ProductService'
import { getUser } from '../../utils/sessionStorage'
import { DialogTableContainer } from './DialogContainer'

interface ReportsHistoryDialog {
  product: ProductMonitoringResponseDTO
  state: boolean[]
  setState(state: boolean[]): void
  index: number
}

export function ReportsHistoryDialog({
  product,
  state,
  setState,
  index
}: ReportsHistoryDialog) {
  const [reports, setReports] = useState<ReportDTO[]>([])

  function fetchData() {
    const user = getUser()
    ProductService.getProductReports(product.id, user.cpf).then(res =>
      setReports(res.data)
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <DialogTableContainer
      state={state}
      setState={setState}
      index={index}
      dialogTitle="Histórico de Relatórios"
    >
      {reports.map(report => (
        <React.Fragment key={report.mes}>
          <Accordion
            sx={{ width: '100%', backgroundColor: '#F1F3FA' }}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>{`Mês: ${report.mes}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                sx={{ pb: 2 }}
                disabled
                fullWidth
                label="Valor (R$)"
                value={report.preco}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PriceChange />
                    </InputAdornment>
                  )
                }}
              />
              <br />
              <TextField
                disabled
                fullWidth
                label="Vendas Realizadas (und)"
                value={report.vendas_realizadas}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Numbers />
                    </InputAdornment>
                  )
                }}
              />
            </AccordionDetails>
          </Accordion>
        </React.Fragment>
      ))}
    </DialogTableContainer>
  )
}
