import axios from 'axios'

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

export const addVoltCoins = (earnedPoints) => {
  return async (dispatch, getState) => {
    const { userID, voltCoins } = getState().auth.user
    const updatedVoltCoins = voltCoins + earnedPoints

    try {
      const response = await axios.put(
        `http://localhost:8080/api/voltCoins/${userID}`,
        updatedVoltCoins,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const newVoltCoins = response.data
      dispatch({
        type: 'ADD_VOLTCOINS',
        payload: newVoltCoins,
      })
    } catch (error) {
      console.error('Error updating voltCoins:', error.message || error)
    }
  }
}