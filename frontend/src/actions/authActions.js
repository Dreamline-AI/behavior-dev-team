export const loginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
})

export const logout = () => ({
  type: 'LOGOUT',
})

export const updateUserInfo = (user) => ({
  type: 'UPDATE_USER_INFO',
  payload: user,
})
