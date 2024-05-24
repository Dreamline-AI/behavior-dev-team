/**
 * Create a context to manage authentication state. 
 * This allows different parts of the app to access and modify the authentication state.
 */
import React, { useState, useContext } from 'react';

// Create the AuthContext
const AuthContext = React.createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    // Provide the loggedInUser and setLoggedInUser to the rest of the app
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
