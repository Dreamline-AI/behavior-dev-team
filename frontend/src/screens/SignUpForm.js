import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  CheckBox,
  Button,
  StyleSheet,
} from 'react-native'
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
    <View style={styles.container}>
      <Text style={styles.header}>Tell us more about yourself</Text>

      <Text>First name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={setLastName}
      />

      <Text>Your zipcode</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your zipcode"
        value={zipcode}
        onChangeText={setZipcode}
      />

      <View style={styles.checkboxContainer}>
        <CheckBox value={rememberMe} onValueChange={setRememberMe} />
        <Text style={styles.checkboxLabel}>Remember me</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
})

export default SignUpForm
