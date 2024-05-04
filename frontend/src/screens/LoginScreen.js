import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'

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
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Login with Facebook
      </Button>
      <Button
        color="white"
        mode="contained"
        onPress={() => navigation.navigate('LoginWithEmail')}
      >
        Log in with Email
      </Button>
    </Background>
  )
}