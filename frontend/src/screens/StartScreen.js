import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import { signInWithFacebookPopup } from '../../firebaseConfig'

export default function StartScreen({ navigation }) {
  const logFBUser = async () => {
    const response = await signInWithFacebookPopup();
    console.log('response-->', response);

    if (await response?.user?.getIdToken()) {
      navigation.navigate('Dashboard');
    } else {
      // back to login or signup screen
    }
}
  return (
    <Background>
      <Logo />
      <Header>Welcome!</Header>
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
        onPress={logFBUser}
      >
        Login with Facebook
      </Button>
      <Button
        color="white"
        mode="contained"
        onPress={() => navigation.navigate('EmailSignUp')}
      >
        Sign Up with Email
      </Button>
      <Button
        color="white"
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Log in
      </Button>
    </Background>
  )
}
