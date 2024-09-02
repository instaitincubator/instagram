const StorageKey = {
  token: 'access_token',
}

export const deleteToken = () => {
  localStorage.removeItem(StorageKey.token)
}

export const getToken = () => {
  return localStorage.getItem(StorageKey.token)
}

export const setToken = (token: string) => {
  localStorage.setItem(StorageKey.token, token)
}
