import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithFacebookPopup, signInWithGooglePopup } from '../../firebaseConfig';
import styles from "../commonStyles";
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { emailValidator } from '../helpers/emailValidator';
import LoadScreen from './LoadScreen';
// import 'react-toastify/dist/ReactToastify.css';

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
    //console.log('Updated Users:', users);
  }, [users]);

  useEffect(() => {
    setIsEmailValid(!emailValidator(email.value))
  }, [email.value])

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }
  // const isExistingUser = async (userEmail, source) => {
  //   setLoading(true); // Set loading to true while checking user
  //   try {
  //     // Fetch user details by email
  //     const response = await axios.get(`http://localhost:8080/api/user-info/${userEmail}`);
  //     const user = response.data;
  
  //     if (user) {
  //       // Navigate to the appropriate screen if user exists
  //       if (source === 'emailsignin') {
  //         navigation.reset({
  //           index: 0,
  //           routes: [
  //             {
  //               name: 'SignIn',
  //               params: { user },  // Pass the entire user object
  //             },
  //           ],
  //         });
  //       } else if (source === 'gfa') {
  //         navigation.reset({
  //           index: 0,
  //           routes: [
  //             {
  //               name: 'WelcomeScreen',
  //               params: {
  //                 userEmail: user.email,
  //                 userFirstName: user.firstName,
  //                 userLastName: user.lastName,
  //               },
  //             },
  //           ],
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     // Handle user not found scenario
  //     if (error.response && error.response.status === 404) {
  //       const targetScreen = source === 'emailsignin' ? 'EmailSignUp' : 'LoginWithGFA';
  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: targetScreen, params: { email: userEmail } }],
  //       });
  //     } else {
  //       console.error('Error checking user:', error);
  //       toast.error('Error checking user. Please try again.');
  //     }
  //   } finally {
  //     setLoading(false); // Reset loading state
  //   }
  // };
  const isExistingUser = async (userEmail, source) => {
    try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/user-info/${userEmail}`);
        const user = response.data;

        // Check if the user object is empty or undefined
        if (user && Object.keys(user).length > 0) {
            console.log('Source:', source);
            
            if (source === 'continue') {
                console.log('Going to sign-in page');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignIn', params: { user } }],
                });
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{
                        name: 'WelcomeScreen',
                        params: {
                            userEmail: user.email,
                            userFirstName: user.firstName,
                            userLastName: user.lastName,
                        },
                    }],
                });
            }
        } else {
            // Navigate to WelcomeScreen if user is not found
            console.log('User not found, navigating to Signup page');
            navigation.reset({
                index: 0,
                routes: [{
                    name: 'EmailSignUp',
                    params:{user}
    
                }],
            });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    } finally {
        setLoading(false);
    }
  };



  

  const onContinuePressed = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    } else {
      isExistingUser(email.value, 'continue');
    }
  };

  const [isFirstTimeSignIn, setIsFirstTimeSignIn] = useState(true);

  const logGoogleUser = async () => {
    setAuthLoading(true); // Set auth loading to true
    try {
      const response = await signInWithGooglePopup();
      console.log('response-->', response);

      if (response?.user?.email) {
        isExistingUser(response.user.email, 'auth');
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
        isExistingUser(response.user.email, 'auth');
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
        onPress={onContinuePressed}
        style={[styles.startScreen.continueButton, isEmailValid ? styles.startScreen.continueButtonEnabled : styles.startScreen.continueButtonDisabled]} // Conditionally apply styles
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
        onPress={logGoogleUser}
        style={[styles.startScreen.buttonBorder, styles.startScreen.googleButton]} // Add style for Google button
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
        onPress={logFBUser}
        style={[styles.startScreen.buttonBorder, styles.startScreen.facebookButton]} // Add style for Facebook button
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
        style={[styles.startScreen.buttonBorder, styles.startScreen.appleButton]} // Add style for Apple button
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

