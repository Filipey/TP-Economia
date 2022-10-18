import { User } from '../schemas/Models'

export function setUser(user: User) {
  window.sessionStorage.setItem('USER', JSON.stringify(user))
}

export function getUser() {
  return JSON.parse(window.sessionStorage.getItem('USER')!)
}
