import { SignInUserDTO, SignUpUserDTO } from '../../schemas/DTO'
import { User } from '../../schemas/Models'
import { api } from '../api'

const authUser = (userDto: SignInUserDTO) =>
  api.post<User>('/users/login', userDto)

const createUser = (dto: SignUpUserDTO) => api.post('/users/create', dto)

export const AuthService = { authUser, createUser }
