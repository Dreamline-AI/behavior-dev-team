import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Checkbox, Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { repeatPasswordValidator } from '../helpers/repeatPasswordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { zipcodeValidator } from '../helpers/zipcodeValidator'

export default function EmailSignUp({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [repeatPassword, setRepeatPassword] = useState({ value: '', error: '' })
  const [zipcode, setZipcode] = useState({value: '', error: '' })
  const [isChecked, setIsChecked] = useState(false)

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const repeatPasswordError = repeatPasswordValidator(repeatPassword.value, password.value)
    const zipcodeError = zipcodeValidator(zipcode.value)

    if (emailError || passwordError|| repeatPasswordError || nameError || zipcodeError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setRepeatPassword({ ...repeatPassword, error: repeatPasswordError })
      setZipcode({ ...zipcode, error: zipcodeError})
      return
    }
 
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard',
      params: {
        userName: name.value,},
     }],
    })
  }

  return (
  
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Sign Up with Email</Header>
      <TextInput
        title="Email"
        label="Enter your email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!name.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        title="Password"
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        title="Repeat your password"
        label="Repeat Password"
        returnKeyType="done"
        value={repeatPassword.value}
        onChangeText={(text) => setRepeatPassword({ value: text, error: '' })}
        error={!!repeatPassword.error}
        errorText={repeatPassword.error}
        secureTextEntry
      />
      <TextInput
        title="Your name"
        label="Your name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        title="Your zipcode"
        label="Enter zipcode"
        returnKeyType="next"
        keyboardType="numeric"
        maxLength={5}
        value={zipcode.value}
        onChangeText={(text) => setZipcode({ value: text, error: '' })}
        error={!!zipcode.error}
        errorText={zipcode.error}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox
        status={isChecked ? 'checked' : 'unchecked'}
        onPress={() => setIsChecked(!isChecked)}
        />
     <Text>Remember Me</Text>
        </View>
      
      <Button
        color="black"
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  
  )
  
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})