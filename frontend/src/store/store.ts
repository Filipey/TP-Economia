import { User } from '../schemas/Models'
import { getUser } from '../utils/sessionStorage'

const user: User = getUser()

export { user }
