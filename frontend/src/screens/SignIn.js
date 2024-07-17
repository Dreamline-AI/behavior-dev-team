import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';

export default function SignIn({ navigation, route }) {
  const { user } = route.params; // Retrieve the user details
  const [password, setPassword] = useState({ value: '', error: '' });
  const [isChecked, setIsChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Validate the form
    setIsFormValid(password.value.length > 0);
  }, [password.value]);

  const onSignInPressed = () => {
    if (password.value === user.password) {
      // If passwords match, navigate to Dashboard
      navigation.reset({
        index: 0,
        routes: [{
          name: 'Dashboard',
          params: {
            userFirstName: user.firstName,
            userLastName: user.lastName,
          },
        }],
      });
    } else {
      // If passwords do not match, show error message
      setPassword({ ...password, error: 'Password is not valid' });
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Sign in with email</Header>

      <TextInput
        title="Your password"
        label="Enter your password"
        returnKeyType="next"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
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
        onPress={onSignInPressed}
        style={{ marginTop: 24 }}
      >
        Sign In
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
