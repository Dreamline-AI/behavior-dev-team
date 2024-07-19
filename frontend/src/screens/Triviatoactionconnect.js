import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Triviatoactionconnect = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.coinsText}>+500 coins</Text>
        <Text style={styles.messageText}>Congrats on completing an action!</Text>
      </View>
      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f7f7f7',
    marginBottom: 20,
  },
  coinsText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 18,
    marginTop: 10,
  },
  doneButton: {
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Triviatoactionconnect;
