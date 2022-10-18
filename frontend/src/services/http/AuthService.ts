import { SignInUserDTO } from '../../schemas/DTO'
import { api } from '../api'

const authUser = (userDto: SignInUserDTO) => api.post('/users/login', userDto)

export const AuthService = [authUser]
