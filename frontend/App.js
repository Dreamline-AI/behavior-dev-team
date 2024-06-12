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
  QuizScreen,
  QuizEndingScreen,
  QuizStreakScreen,
  RedoQuestionsScreen,
  IncorrectQuestionScreen,
} from './src/screens'


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
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="LoginWithGFA" component={LoginWithGFA} />
          <Stack.Screen name="EmailSignUp" component={EmailSignUp} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
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
