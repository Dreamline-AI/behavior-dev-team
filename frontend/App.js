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
  Dashboard,
  IncentivesList,
  IncentiveDetailPage,
  QuizScreen,
  QuizEndingScreen,
  QuizStreakScreen,
  RedoQuestionsScreen,
  IncorrectQuestionScreen,
} from './src/screens'
// import LoginWithEmail from './src/screens/LoginWithEmail'
import SignUpForm from './src/screens/SignUpForm'
import WelcomeScreen from './src/screens/WelcomeScreen'
import LoginFacebook from './src/screens/LoginFacebook'
import TakeActionScreen from './src/screens/TakeActionScreen'
import Triviatoactionconnect from './src/screens/Triviatoactionconnect'
import BottomNavigationBar from './src/screens/BottomNavigationBar'
import ProfileScreen from './src/screens/ProfileScreen'
import EditProfileScreen from './src/screens/EditProfileScreen'
import SignIn from './src/screens/SignIn'

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
          <Stack.Screen
            name="Triviatoactionconnect"
            component={Triviatoactionconnect}
          />
          <Stack.Screen name="TakeActionScreen" component={TakeActionScreen} />
          <Stack.Screen name="SignUpForm" component={SignUpForm} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginGoogle" component={LoginGoogle} />
          <Stack.Screen name="LoginFacebook" component={LoginFacebook} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="LoginWithGFA" component={LoginWithGFA} />
          <Stack.Screen name="EmailSignUp" component={EmailSignUp} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="IncentivesList" component={IncentivesList} />
          <Stack.Screen
            name="IncentiveDetailPage"
            component={IncentiveDetailPage}
          />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen
            name="BottomNavigationBar"
            component={BottomNavigationBar}
          />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
          />
          <Stack.Screen name="QuizScreen" component={QuizScreen} />
          <Stack.Screen name="QuizEndingScreen" component={QuizEndingScreen} />
          <Stack.Screen
            name="RedoQuestionsScreen"
            component={RedoQuestionsScreen}
          />
          <Stack.Screen
            name="IncorrectQuestionScreen"
            component={IncorrectQuestionScreen}
          />
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
