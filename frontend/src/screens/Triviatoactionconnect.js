import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from "../commonStyles"

const Triviatoactionconnect = ({ navigation }) => {
  return (
    <View style={styles.triviaToActionConnect.container}>
      <View style={styles.triviaToActionConnect.card}>
        <Text style={styles.triviaToActionConnect.coinsText}>+500 coins</Text>
        <Text style={styles.triviaToActionConnect.messageText}>Congrats on completing an action!</Text>
      </View>
      <TouchableOpacity
        style={styles.triviaToActionConnect.doneButton}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={styles.triviaToActionConnect.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};



export default Triviatoactionconnect;
