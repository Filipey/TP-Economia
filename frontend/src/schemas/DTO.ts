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
