// src/reducers/authReducer.js

const initialState = {
  isAuthenticated: false,
  user: {
    userID: '',
    email: '',
    firstName: '',
    lastName: '',
    zipCode: '',
    userName: '',
    voltCoins: 15
  },
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: {
          userID: action.payload.userID,
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          userName: action.payload.userName || '',
          voltCoins:
          action.payload.voltCoins !== undefined
            ? action.payload.voltCoins
            : 15,
        },
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: {
          email: '',
          firstName: '',
          lastName: '',
          zipCode: '',
        },
      }
    case 'UPDATE_USER_INFO':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      }
    case 'ADD_VOLTCOINS':
      return {
        ...state,
        user: {
          ...state.user,
          voltCoins: state.user.voltCoins + action.payload,
        },
      }
    default:
      return state
  }
}

export default authReducer
