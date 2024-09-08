// src/reducers/authReducer.js

const initialState = {
    isAuthenticated: false,
    user: {
      email: '',
      firstName: '',
      lastName: '',
    },
  };
  
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
          },
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
          user: {
            email: '',
            firstName: '',
            lastName: '',
          },
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  