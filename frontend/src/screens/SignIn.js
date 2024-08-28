import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Checkbox, Text } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import styles from '../commonStyles'

export default function SignIn({ navigation, route }) {
  const { user } = route.params
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isChecked, setIsChecked] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    const loadUserCredentials = async () => {
      try {
        const savedCredentials = await AsyncStorage.getItem('userCredentials')
        if (savedCredentials) {
          const { email, password } = JSON.parse(savedCredentials)
          if (email === user.email) {
            setPassword({ value: password, error: '' })
            setIsChecked(true)
          }
        }
      } catch (e) {
        console.error('Failed to load user credentials', e)
      }
    }

    loadUserCredentials()
  }, [user.email])

  useEffect(() => {
    setIsFormValid(password.value.length > 0)
  }, [password.value])

  const onSignInPressed = async () => {
    if (password.value === user.password) {
      if (isChecked) {
        try {
          await AsyncStorage.setItem(
            'userCredentials',
            JSON.stringify({
              email: user.email,
              password: user.password,
            })
          )
          console.log('User credentials saved')
        } catch (e) {
          console.error('Failed to save user credentials', e)
        }
      } else {
        try {
          await AsyncStorage.removeItem('userCredentials')
          console.log('User credentials removed')
        } catch (e) {
          console.error('Failed to remove user credentials', e)
        }
      }

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'WelcomeScreen',
            params: {
              userFirstName: user.firstName,
              userLastName: user.lastName,
            },
          },
        ],
      })
    } else {
      setPassword({ ...password, error: 'Password is not valid' })
    }
  }

  return (
    <Background>
      <View style={styles.signIn.top}>
        <BackButton
          goBack={navigation.goBack}
          style={styles.signIn.backButton}
        />
        <Header title="Sign in with email" />
      </View>

      <TextInput
        title="Your password"
        placeholder="Enter your password"
        returnKeyType="next"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry={true}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox
          status={isChecked ? 'checked' : 'unchecked'}
          onPress={() => setIsChecked(!isChecked)}
        />
        <Text>Remember Me</Text>
      </View>

      <Button
        color={isFormValid ? 'black' : 'gray'}
        mode="contained"
        onPress={onSignInPressed}
        style={[styles.signIn.button]}
      >
        Sign In
      </Button>
    </Background>
  )
}
