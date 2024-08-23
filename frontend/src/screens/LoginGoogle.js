import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import * as WebBrowser from 'expo-web-browser'
import { signInWithGooglePopup } from '../../firebaseConfig'
import styles from "../commonStyles"

WebBrowser.maybeCompleteAuthSession()

export default function LoginGoogle({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isFirstTimeSignIn, setIsFirstTimeSignIn] = useState(true); // New state for tracking first-time sign-in
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

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignUpForm' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back!</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.loginGoogle.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.loginGoogle.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={logGoogleUser}>
        Login
      </Button>
      <View style={styles.loginGoogle.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.loginGoogle.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}


