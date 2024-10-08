import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import styles from '../commonStyles'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserInfo } from '../actions/authActions'

export default function EditProfileScreen({ route, navigation }) {
  // Destructure name from route.params with a default empty string
  const { name = '' } = route.params || {}

  // Ensure that name is a string and split safely
  const [fn, ...ln] = typeof name === 'string' ? name.split(' ') : []

  const [firstName, setFirstName] = useState({ value: fn, error: '' })
  const [lastName, setLastName] = useState({ value: ln.join(' '), error: '' })
  const [zipcode, setZipcode] = useState({ value: '', error: '' })

  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (user) {
      setFirstName({ value: user.firstName, error: '' })
      setLastName({ value: user.lastName, error: '' })
      setZipcode({ value: user.zipCode, error: '' }) // Prefill with existing zipcode
    }
  }, [user])

  const onSaveChangesPressed = () => {
    // Dispatch the action to update user info
    const userName = `${firstName.value} ${lastName.value}`.trim()

    dispatch(
      updateUserInfo({
        firstName: firstName.value,
        lastName: lastName.value,
        zipCode: zipcode.value,
        userName: userName,
      })
    )

    navigation.navigate('ProfileScreen')
  }

  return (
    <Background>
      <View style={styles.editProfileScreen.headerContainer}>
        <BackButton goBack={navigation.goBack} />
        <Header style={styles.editProfileScreen.header}> Edit profile </Header>
      </View>
      <View style={styles.editProfileScreen.container}>
        <TextInput
          title="Your first name"
          returnKeyType="next"
          value={firstName.value}
          onChangeText={(text) => setFirstName({ value: text, error: '' })}
          error={!!firstName.error}
          errorText={firstName.error}
        />
        <TextInput
          title="Your last name"
          returnKeyType="next"
          value={lastName.value}
          onChangeText={(text) => setLastName({ value: text, error: '' })}
          error={!!lastName.error}
          errorText={lastName.error}
        />
        <TextInput
          title="Your zipcode"
          returnKeyType="next"
          keyboardType="numeric"
          maxLength={5}
          value={zipcode.value}
          onChangeText={(text) => setZipcode({ value: text, error: '' })}
          error={!!zipcode.error}
          errorText={zipcode.error}
        />
      </View>
      <View style={styles.editProfileScreen.footer}>
        <Button
          color="#D9D9D9"
          mode="contained"
          onPress={onSaveChangesPressed}
          style={styles.editProfileScreen.saveButton}
        >
          Save changes
        </Button>
      </View>
    </Background>
  )
}
