import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux'; // Import useDispatch from react-redux
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import LoadScreen from './LoadScreen';
import { emailValidator } from '../helpers/emailValidator';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { signInWithGooglePopup, signInWithFacebookPopup } from '../../firebaseConfig';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../commonStyles";
import Toast from 'react-native-toast-message';

export default function StartScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [authLoading, setAuthLoading] = useState(false); // Authentication loading state

  useEffect(() => {
    axios.get("http://localhost:8080/api/users")
      .then(response => {
        console.log('Data:', response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('Unable to fetch users. Please try again later.');
      })
      .finally(() => {
        setLoading(false); // Set loading to false after API call is complete
      });
  }, []);

  useEffect(() => {
    setIsEmailValid(!emailValidator(email.value));
  }, [email.value]);

  const isExistingUser = (userEmail, source) => {
    let user = users.find(b => b.email === userEmail);
    if (user) {
      // If the user exists, dispatch loginSuccess with user information

      if (source === 'emailsignin') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn', params: { user } }],
        });
      } else if (source === 'gfa') {
        navigation.reset({
          index: 0,
          routes: [{
            name: 'WelcomeScreen',
            params: {
              userEmail: email,
              userFirstName: user.firstName,
              userLastName: user.lastName,
            },
          }],
        });
      }
    } else {
      // Handle non-existing user case
      if (source === 'emailsignin') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'EmailSignUp', params: { email: email.value } }],
        });
      } else if (source === 'gfa') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginWithGFA', params: { email: userEmail } }],
        });
      }
    }
  };

  const onContinuePressed = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    } else {
      isExistingUser(email.value, 'emailsignin');
    }
  };

  const logGoogleUser = async () => {
    setAuthLoading(true); // Set auth loading to true
    try {
      const response = await signInWithGooglePopup();
      console.log('response-->', response);

      if (response?.user?.email) {

        isExistingUser(response.user.email, 'gfa');
      } else {
        toast.error('Google authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Google authentication error:', error);
      toast.error('Google authentication failed. Please try again.');
    } finally {
      setAuthLoading(false); // Set auth loading to false
    }
  };

  const logFBUser = async () => {
    setAuthLoading(true); // Set auth loading to true
    try {
      const response = await signInWithFacebookPopup();
      console.log('response-->', response);

      if (response?.user?.email) {

        isExistingUser(response.user.email, 'gfa');
      } else {
        toast.error('Facebook authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Facebook authentication error:', error);
      toast.error('Facebook authentication failed. Please try again.');
    } finally {
      setAuthLoading(false); // Set auth loading to false
    }
  };

  if (loading || authLoading) {
    // Show loading indicator while fetching data or authenticating
    return (
      <Background>
        <LoadScreen />
      </Background>
    );
  }
  
  return (
    <Background>
      <Header>Sign up or Sign in</Header>

      <TextInput
        title="Email"
        placeholder="Enter your email"
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
        color="white"
        mode="contained"
        disabled={!isEmailValid}
        onPress={onContinuePressed} // Triggers onContinuePressed function
        style={[
          styles.startScreen.continueButton,
          isEmailValid ? styles.startScreen.continueButtonEnabled : styles.startScreen.continueButtonDisabled,
        ]}
      >
        <Text style={styles.startScreen.continueButtonText}>Continue</Text>
      </Button>

      <View style={styles.startScreen.separatorContainer}>
        <View style={styles.startScreen.line} />
        <Text style={styles.startScreen.orText}>or</Text>
        <View style={styles.startScreen.line} />
      </View>

      <Button
        color="white"
        mode="contained"
        onPress={logGoogleUser} // Triggers logGoogleUser function
        style={[
          styles.startScreen.buttonBorder,
          styles.startScreen.googleButton,
        ]}
        icon={() => (
          <AntDesign
            name="google"
            size={20}
            color="black"
            style={styles.startScreen.iconStyle}
          />
        )}
      >
        <Text style={styles.startScreen.buttonText}>Continue with Google</Text>
      </Button>

      <Button
        color="white"
        mode="contained"
        onPress={logFBUser} // Triggers logFBUser function
        style={[
          styles.startScreen.buttonBorder,
          styles.startScreen.facebookButton,
        ]}
        icon={() => (
          <MaterialIcon
            name="facebook"
            size={20}
            color="black"
            style={styles.startScreen.iconStyle}
          />
        )}
      >
        <Text style={styles.startScreen.buttonText}>Continue with Facebook</Text>
      </Button>

      <Button
        color="white"
        mode="contained"
        onPress={() => navigation.reset({
          index: 0,
          routes: [{
            name: 'Dashboard',
            params: {
              userFirstName: "test",
              userLastName: "user",
            },
          }],
        })}
        style={[
          styles.startScreen.buttonBorder,
          styles.startScreen.appleButton,
        ]}
        icon={() => (
          <MaterialIcon
            name="apple"
            size={20}
            color="black"
            style={styles.startScreen.iconStyle}
          />
        )}
      >
        <Text style={styles.startScreen.buttonText}>Continue with Apple</Text>
      </Button>
    </Background>
  )
}
