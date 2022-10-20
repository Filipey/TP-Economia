import {
  ProductMonitoringResponseDTO,
  ProductResponseDTO
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

export const UserService = {
  getUserByCpf,
  getUserProducts,
  countUserProducts,
  getUserMonitoringProducts,
  countUserMonitoringProducts
}
