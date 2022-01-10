import {request} from "../helpers/request";

const url = {
  register: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
  getInfo: '/auth'
}

const register = ({username, password}) => {
  return request(url.register, 'POST', {username, password})
}
const login = ({username, password}) => {
  return request(url.login, 'POST', {username, password})
}
const logout = () => {
  return request(url.logout)
}
const getInfo = () => {
  return request(url.getInfo)
}
export {register, login, logout, getInfo}
