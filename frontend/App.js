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
  LoginWithGFA,
  RegisterScreen,
  ResetPasswordScreen,
  EditProfileScreen,
  Dashboard,
  ProfileScreen,
  QuizScreen,
  QuizEndingScreen,
  QuizStreakScreen,
  RedoQuestionsScreen,
  IncorrectQuestionScreen,
} from './src/screens'
import LoginWithEmail from './src/screens/LoginWithEmail'
// import LoginWithEmail from './src/screens/LoginWithEmail'
import SignUpForm from './src/screens/SignUpForm.js'
import LoginFacebook from './src/screens/LoginFacebook'
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
          <Stack.Screen name="LoginFacebook" component={LoginFacebook} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="LoginWithGFA" component={LoginWithGFA} />
          <Stack.Screen name="EmailSignUp" component={EmailSignUp} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> 
          <Stack.Screen name="EditProfileScreen" component={EditProfileScreen}/>
          <Stack.Screen name="QuizScreen" component={QuizScreen} />
          <Stack.Screen name="QuizEndingScreen" component={QuizEndingScreen} />
          <Stack.Screen name="RedoQuestionsScreen" component={RedoQuestionsScreen} />
          <Stack.Screen name="IncorrectQuestionScreen" component={IncorrectQuestionScreen} />
          <Stack.Screen name="QuizStreakScreen" component={QuizStreakScreen} />

          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
