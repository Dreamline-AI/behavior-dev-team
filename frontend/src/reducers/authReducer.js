// src/reducers/authReducer.js

const initialState = {
  isAuthenticated: false,
  user: {
    email: '',
    firstName: '',
    lastName: '',
    zipCode: '',
    userName: '',
    userId: ''
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
          userId: action.payload.userId,
          zipcode: action.payload.zipcode
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
          userId: ''
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
