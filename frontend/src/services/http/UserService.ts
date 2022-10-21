import {
  MonitoringDTO,
  ProductMonitoringResponseDTO,
  ProductResponseDTO,
  ReportDTO
} from '../../schemas/DTO'
import { User } from '../../schemas/Models'
import { api } from '../api'

const getUserByCpf = (cpf: string) => api.get<User>(`/users/id/${cpf}`)

const getUserProducts = (cpf: string) =>
  api.get<ProductResponseDTO[]>(`/users/products/${cpf}`)

const countUserProducts = (cpf: string) =>
  api.get(`/users/products/count/${cpf}`)

const getUserMonitoringProducts = (cpf: string) =>
  api.get<ProductMonitoringResponseDTO[]>(`/users/monitoring/products/${cpf}`)

const countUserMonitoringProducts = (cpf: string) =>
  api.get(`/users/monitoring/products/count/${cpf}`)

const createNewMonitoring = (dto: MonitoringDTO) =>
  api.post(`/users/monitoring/new`, dto)

const createNewReport = (dto: ReportDTO) =>
  api.post(`/users/monitoring/report/new`, dto)

export const UserService = {
  getUserByCpf,
  getUserProducts,
  countUserProducts,
  getUserMonitoringProducts,
  countUserMonitoringProducts,
  createNewMonitoring,
  createNewReport
}
