// src/reducers/authReducer.js

const initialState = {
  isAuthenticated: false,
  user: {
    email: '',
    firstName: '',
    lastName: '',
    zipCode: '',
    userName: '',
  },
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: {
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          userName: action.payload.userName || '',
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
    default:
      return state
  }
}

export default authReducer
