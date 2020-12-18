export const onLogin = token => {
  localStorage.setItem('authToken', token)
}

export const onLogout = () => {
  localStorage.removeItem('authToken');
}