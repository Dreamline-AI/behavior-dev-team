import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { nameValidator } from '../helpers/nameValidator';
import { zipcodeValidator } from '../helpers/zipcodeValidator';

export default function LoginWithGFA({ navigation }) {
  const [firstName, setFirstName] = useState({ value: '', error: '' });
  const [lastName, setLastName] = useState({ value: '', error: '' });
  const [zipcode, setZipcode] = useState({ value: '', error: '' });
  const [isChecked, setIsChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const firstNameError = nameValidator(firstName.value);
    const lastNameError = nameValidator(lastName.value);
    const zipcodeError = zipcodeValidator(zipcode.value);

    if (!firstNameError && !lastNameError && !zipcodeError && firstName.value && lastName.value && zipcode.value) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [firstName, lastName, zipcode]);

  const onSignUpPressed = () => {
    const firstNameError = nameValidator(firstName.value);
    const lastNameError = nameValidator(lastName.value);
    const zipcodeError = zipcodeValidator(zipcode.value);

    if (firstNameError || lastNameError || zipcodeError) {
      setFirstName({ ...firstName, error: firstNameError });
      setLastName({ ...lastName, error: lastNameError });
      setZipcode({ ...zipcode, error: zipcodeError });
      return;
    }

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
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Tell us more about yourself</Header>
     
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
        color={isFormValid ? "black" : "gray"}
        mode="contained"
        disabled={!isFormValid}
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