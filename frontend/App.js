import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  LoginGoogle,
  EmailSignUp,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'
import LoginWithEmail from './src/screens/LoginWithEmail'
import SignUpForm from './src/screens/SignUpForm.js'
import TakeActionScreen from './src/screens/TakeActionScreen.js'
import Triviatoactionconnect from './src/screens/Triviatoactionconnect'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Triviatoactionconnect" component={Triviatoactionconnect} />
          <Stack.Screen name="TakeActionScreen" component={TakeActionScreen} />
          <Stack.Screen name="SignUpForm" component={SignUpForm} />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginGoogle" component={LoginGoogle} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="LoginWithEmail" component={LoginWithEmail} />
          <Stack.Screen name="EmailSignUp" component={EmailSignUp} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
