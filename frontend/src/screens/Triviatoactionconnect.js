import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import styles from "../commonStyles"
import celebrate from '../assets/celebrate.png'
import Background from '../components/Background';

  const Triviatoactionconnect = ({ navigation, route }) => {
    const { userName, userFirstName, userLastName } = route.params;
  return (
    <Background>
    <View style={styles.triviaToActionConnect.container}>
      <View style={styles.triviaToActionConnect.content}>
      <View style={styles.triviaToActionConnect.card}>
      <Image source={celebrate} style={styles.triviaToActionConnect.celebrate} />
        <Text style={styles.triviaToActionConnect.coinsText}>+500 coins</Text>
        <Text style={styles.triviaToActionConnect.messageText}>Congrats on completing an action!</Text>
      </View>
      </View>
      <TouchableOpacity
        style={styles.triviaToActionConnect.doneButton}
        onPress={() => navigation.navigate('Dashboard',{userName, userFirstName, userLastName})}
      >
        <Text style={styles.triviaToActionConnect.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
    </Background>
  );
};



export default Triviatoactionconnect;
