import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { repeatPasswordValidator } from '../helpers/repeatPasswordValidator';
import { nameValidator } from '../helpers/nameValidator';
import { zipcodeValidator } from '../helpers/zipcodeValidator';
import axios from 'axios';

export default function EmailSignUp({ navigation, route }) {
  const { email } = route.params; // Get the email from route parameters

  const [firstName, setFirstName] = useState({ value: '', error: '' });
  const [lastName, setLastName] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [repeatPassword, setRepeatPassword] = useState({ value: '', error: '' });
  const [zipcode, setZipcode] = useState({ value: '', error: '' });
  const [isChecked, setIsChecked] = useState(false);

  const generateUserID = (firstName, lastName) => {
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    return capitalize(firstName) + capitalize(lastName);
  };

  const onSignUpPressed = () => {
    const firstNameError = nameValidator(firstName.value);
    const lastNameError = nameValidator(lastName.value);
    const passwordError = passwordValidator(password.value);
    const repeatPasswordError = repeatPasswordValidator(repeatPassword.value, password.value);
    const zipcodeError = zipcodeValidator(zipcode.value);

    if ( passwordError || repeatPasswordError || firstNameError || lastNameError || zipcodeError) {
      setFirstName({ ...firstName, error: firstNameError });
      setLastName({ ...lastName, error: lastNameError });
      setPassword({ ...password, error: passwordError });
      setRepeatPassword({ ...repeatPassword, error: repeatPasswordError });
      setZipcode({ ...zipcode, error: zipcodeError });
      return;
    }

    const userID = generateUserID(firstName.value, lastName.value);

    if (isChecked) {
      // Call the save user API
      const userData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email,
        zipcode: zipcode.value,
        password: password.value,
        userID: userID,
      };

      axios.post('http://localhost:8080/api/users', userData)
        .then(response => {
          console.log('User saved:', response.data);
          navigation.reset({
            index: 0,
            routes: [{
              name: 'WelcomeScreen',
              params: {
                userFirstName: firstName.value,
                userLastName: lastName.value,
                userEmail: email,
              },
            }],
          });
        })
        .catch(error => {
          console.error('Error saving user:', error);
          // Handle the error (e.g., show a toast message)
        });
    } else {
      navigation.reset({
        index: 0,
        routes: [{
          name: 'Dashboard',
          params: {
            userFirstName: firstName.value,
            userLastName: lastName.value,
          },
        }],
      });
    }
  };

  return (
    <Background>
      <BackButton  />
      <Header>Sign up with Email</Header>
     
      <TextInput
        title="Password"
        label="Enter your password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        title="Repeat password"
        label="Repeat your password"
        returnKeyType="done"
        value={repeatPassword.value}
        onChangeText={(text) => setRepeatPassword({ value: text, error: '' })}
        error={!!repeatPassword.error}
        errorText={repeatPassword.error}
        secureTextEntry
      />
      <TextInput
        title="First name"
        label="Enter your first name"
        returnKeyType="next"
        value={firstName.value}
        onChangeText={(text) => setFirstName({ value: text, error: '' })}
        error={!!firstName.error}
        errorText={firstName.error}
      />
      <TextInput
        title="Last name"
        label="Enter your last name"
        returnKeyType="next"
        value={lastName.value}
        onChangeText={(text) => setLastName({ value: text, error: '' })}
        error={!!lastName.error}
        errorText={lastName.error}
      />
      <TextInput
        title="Your zipcode"
        label="Enter your zipcode"
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
    </Background>
  );
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
});
