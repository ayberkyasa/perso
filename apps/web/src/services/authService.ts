const TOKEN_KEY = "perso.auth.token"

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

const isLogged = () => {
  return !!getToken()
}

export default {
  setToken,
  getToken,
  removeToken,
  isLogged,
}
