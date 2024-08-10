import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  CheckBox,
  Button,
  StyleSheet,
} from 'react-native'
import styles from "../commonStyles"
// Tell me more about yourself Screen
// Contains FirstName + LastName + Zipcode
const SignUpForm = ({ navigation }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSignUp = () => {
    // Handle sign-up logic
    console.log({ firstName, lastName, zipcode, rememberMe })
  }

  return (
    <View style={styles.signUpForm.container}>
      <Text style={styles.signUpForm.header}>Tell us more about yourself</Text>

      <Text>First name</Text>
      <TextInput
        style={styles.signUpForm.input}
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text>Last Name</Text>
      <TextInput
        style={styles.signUpForm.input}
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={setLastName}
      />

      <Text>Your zipcode</Text>
      <TextInput
        style={styles.signUpForm.input}
        placeholder="Enter your zipcode"
        value={zipcode}
        onChangeText={setZipcode}
      />

      <View style={styles.signUpForm.checkboxContainer}>
        <CheckBox value={rememberMe} onValueChange={setRememberMe} />
        <Text style={styles.signUpForm.checkboxLabel}>Remember me</Text>
      </View>

      <Button
        title="Sign up"
        onPress={() => {
          if (firstName && lastName && zipcode) {
            handleSignUp()
            navigation.navigate('Dashboard')
          }
        }}
        disabled={!firstName || !lastName || !zipcode}
      />
    </View>
  )
}



export default SignUpForm
