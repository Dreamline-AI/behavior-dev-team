import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

export default function WelcomeScreen({ route, navigation }) {
  const { userFirstName, userLastName } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
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
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/welcome.png')} // make sure this path is correct
        style={styles.image}
      />
      <Text style={styles.text}>Sustainable living starts here!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Set background color to white
  },
  image: {
    width: 300,
    height: 500,
    resizeMode: 'contain',
    filter: 'grayscale(100%)', // Apply grayscale effect
  },
  text: {
    marginTop: 10, // Adjust the margin as needed
    fontSize: 40, // Adjust the font size as needed
    fontWeight: 'bold', // Make the text bold
    color: 'black', // Text color
    textAlign: 'center', // Center align the text
  },
});
