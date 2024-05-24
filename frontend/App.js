import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './src/context/AuthProvider';
import AppStack from './src/navigation/AppStack';
import GuestStack from './src/navigation/GuestStack';
import { theme } from './src/core/theme';

const MainNavigator = () => {
  const { loggedInUser } = useAuth();

  return loggedInUser ? <AppStack /> : <GuestStack />;
};

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}
