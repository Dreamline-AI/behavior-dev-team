import React, { useState, useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import { signInWithGooglePopup } from '../../firebaseConfig'

export default function StartScreen({ navigation }) {
  const [isFirstTimeSignIn, setIsFirstTimeSignIn] = useState(true);
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log('response-->', response);

    if (await response?.user?.getIdToken()) {
      // Check if it's the first time sign-in
    if (isFirstTimeSignIn) {
      setIsFirstTimeSignIn(false); 
      navigation.navigate('SignUpForm');
    } else {
      // Navigate to a different screen for returning users
      navigation.navigate('Dashboard');
    }
  } else {
    // Handle sign-in failure
  }
};
  return (
    <Background>
      <Logo />
      <Header>Welcome!</Header>
      
      <Button
        color="black"
        mode="contained"
        onPress={logGoogleUser}
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
