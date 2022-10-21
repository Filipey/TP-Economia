import { User } from './Models'

export interface SignInUserDTO {
  cpf: string
  password: string
}

export interface SignUpUserDTO extends User {
  password: string
}

export interface ProductDTO {
  name: string
  brand: string
  value: number
  inventory: number
}

export interface ProductResponseDTO {
  id: number
  nome: string
  marca: string
  valor: number
  estoque: number
}

export interface ProductMonitoringResponseDTO {
  id: number
  nome: string
  marca: string
  valor: number
  estoque: number
  data_inicio: Date
  data_termino: Date
  expectativa_vendas: number
  vendas_realizadas: number
}

export interface MonitoringDTO {
  idProduct: number
  userCpf: string
  initialDate: Date
  finalDate: Date
  sellingsXp: number
  sellings: number
}

export interface ReportDTO {
  id_produto: number
  cpf_gerente: string
  mes: string
  preco: number
  vendas_realizadas: number
}
