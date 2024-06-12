import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import { ProgressBar } from 'react-native-paper'

export default function LoginScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Welcome back!</Header>
     
      <Button
        color="black"
        mode="contained"
        onPress={() => navigation.navigate('LoginGoogle')}
      >
        Login with Google
      </Button>
      <Button
        color= "#00000066"
        mode="contained"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Login with Apple
      </Button>
      <Button
        color= "#00000066"
        mode="contained"
        onPress={() => navigation.navigate('LoginFacebook')}
      >
        Login with Facebook
      </Button>
      <ProgressBar progress={0.5} color="black" />
      <Button
        color="white"
        mode="contained"
        onPress={() => navigation.navigate('LoginWithEmail')}
      >
        Log in with Email
      </Button>
      <ProgressBar progress={0.5} color="black" />

    </Background>
  )
}