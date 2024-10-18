import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import styles from "../commonStyles"
import { loginSuccess } from '../actions/authActions';

export default function WelcomeScreen({ route, navigation }) {
  const dispatch = useDispatch(); // Initialize dispatch
  const { userFirstName, userLastName, userEmail} = route.params || {};

  useEffect(() => {
    // console.log('userFirstName in useeffect:', userFirstName);  
    // console.log('userLastName in useeffect:', userLastName);    
    const timer = setTimeout(() => {
      dispatch(loginSuccess({
        email: userEmail,
        firstName: userFirstName,
        lastName: userLastName,
      }));
       
      navigation.reset({
        index: 0,
        routes: [{
          name: 'Dashboard',
          params: {
            userFirstName: userFirstName, 
            userLastName: userLastName,
          },
        }],
      });
    }, 1000); //  delay

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigation, userFirstName, userLastName]);

  return (
    <View style={styles.welcomeScreen.container}>
      <Image
        source={require('../assets/welcome.png')} // make sure this path is correct
        style={styles.welcomeScreen.image}
      />
      <Text style={styles.welcomeScreen.text}>Sustainable living starts here!</Text>
    </View>
  );
}


