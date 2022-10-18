import { SignInUserDTO } from '../../schemas/DTO'
import { User } from '../../schemas/Models'
import { api } from '../api'

const authUser = (userDto: SignInUserDTO) =>
  api.post<User>('/users/login', userDto)

export const AuthService = { authUser }
