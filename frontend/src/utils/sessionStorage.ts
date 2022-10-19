import { User } from '../schemas/Models'

export function setUser(user: User) {
  window.sessionStorage.setItem('USER', JSON.stringify(user))
}

export function getUser(): User {
  return JSON.parse(window.sessionStorage.getItem('USER')!)
}

export function validateSession(navigate: (url: string) => void) {
  const storedUser = getUser()
  if (storedUser === null) {
    navigate('/')
    return
  }
  setUser(storedUser)
}
