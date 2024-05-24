import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import Dashboard from '../screens/Dashboard';
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { Checkbox } from 'react-native-paper'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authentication } from '../firebase/config';
import { useAuth } from '../context/AuthProvider'; // Import useAuth hook
import { ActivityIndicator } from 'react-native';



export default function LoginWithEmail({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isChecked, setIsChecked] = useState(false)
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setLoggedInUser } = useAuth();

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setIsLoading(true);
    signInWithEmailAndPassword(authentication, email.value, password.value)
      .then((res) => {
        console.log("successful");
        setLoggedInUser(res.user);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard', params: { userName: res.user.displayName || 'User' } }],
        });
      })
      .catch((err) => {
        console.log(err);
        setError("Incorrect Email/Password");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Login with email</Header>
      <TextInput
        title= "Email"
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
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button color="black" mode="contained" onPress={onLoginPressed}>
        Login
      </Button>

      <View style={styles.rememberMeContainer}>
        <Checkbox
        status={isChecked ? 'checked' : 'unchecked'}
        onPress={() => setIsChecked(!isChecked)}
        />
     <Text>Remember Me</Text>
        </View>
        {isLoading && (
        <ActivityIndicator
          size="small"
          color="black"
          style={{
            alignSelf: "center",
            justifyContent: "center",
            paddingLeft: 10,
            marginTop: 10,
          }}
        />
      )}
    </Background>
  )
  }
  
  const styles = StyleSheet.create({
    rememberMeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      marginRight: 160,
    },
    rememberMeText: {
      marginLeft: 8, 
      flex: 1,
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginTop: 8,
    },
  });