/**
 * Define the stack navigator for unauthenticated users. It will include all screens that a guest can access.
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../screens/StartScreen';
import LoginGoogle from '../screens/LoginGoogle';
import LoginScreen from '../screens/LoginScreen';
import LoginWithEmail from '../screens/LoginWithEmail';
import EmailSignUp from '../screens/EmailSignUp';
import RegisterScreen from '../screens/RegisterScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

const Stack = createStackNavigator();

const GuestStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginGoogle" component={LoginGoogle} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="LoginWithEmail" component={LoginWithEmail} />
      <Stack.Screen name="EmailSignUp" component={EmailSignUp} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default GuestStack;
