import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { signInWithGooglePopup } from '../../firebaseConfig'
import { signInWithFacebookPopup } from '../../firebaseConfig'

export default function StartScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isEmailValid, setIsEmailValid] = useState(false)

  useEffect(() => {
    setIsEmailValid(!emailValidator(email.value))
  }, [email.value])

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
      routes: [{ name: 'Dashboard' }],
    })
  }

  const [isFirstTimeSignIn, setIsFirstTimeSignIn] = useState(true)
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup()
    console.log('response-->', response)

    if (await response?.user?.getIdToken()) {
      // Check if it's the first time sign-in
      if (isFirstTimeSignIn) {
        setIsFirstTimeSignIn(false)
        navigation.navigate('SignUpForm')
      } else {
        // Navigate to a different screen for returning users
        navigation.navigate('Dashboard')
      }
    } else {
      // Handle sign-in failure
    }
  }
  const logFBUser = async () => {
    const response = await signInWithFacebookPopup()
    console.log('response-->', response)

    if (await response?.user?.getIdToken()) {
      navigation.navigate('SignUpForm')
    } else {
      // back to login or signup screen
    }
  }
  return (
    <Background>
      <Header>Sign up or Sign in</Header>

      <TextInput
        title="Email"
        label="Enter your email"
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

      <Button
        color={isEmailValid ? 'black' : 'gray'}
        mode="contained"
        disabled={!isEmailValid}
        onPress={() => navigation.navigate('EmailSignUp')}
      >
        Continue
      </Button>

      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      <Button
        color="white"
        mode="contained"
        onPress={logGoogleUser}
        style={styles.buttonBorder}
        icon={() => (
          <AntDesign
            name="google"
            size={20}
            color="black"
            style={styles.iconStyle}
          />
        )}
      >
        <Text style={styles.buttonText}>Continue with Google</Text>
      </Button>

      <Button
        color="white"
        mode="contained"
        onPress={logFBUser}
        style={styles.buttonBorder}
        icon={() => (
          <MaterialIcon
            name="facebook"
            size={20}
            color="black"
            style={styles.iconStyle}
          />
        )}
      >
        <Text style={styles.buttonText}>Continue with Facebook</Text>
      </Button>

      <Button
        color="white"
        mode="contained"
        onPress={() => navigation.navigate('LoginWithGFA')}
        style={styles.buttonBorder}
        icon={() => (
          <MaterialIcon
            name="apple"
            size={20}
            color="black"
            style={styles.iconStyle}
          />
        )}
      >
        <Text style={styles.buttonText}>Continue with Apple</Text>
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  orText: {
    marginHorizontal: 10,
    color: 'gray',
  },
  buttonBorder: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  iconStyle: {
    marginRight: 10,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
