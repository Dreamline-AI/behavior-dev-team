import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ExitTakingAction = ({ route }) => {
  const navigation = useNavigation();
  const { userName, userFirstName, userLastName } = route.params || {};

  return (
    // <View style={styles.container}>
    //   <View style={styles.card}>
    //     <Text style={styles.messageTitle}>action saved for later</Text>
    //     <Text style={styles.messageDescription}>
    //       Come back to complete this action within 7 days and gain +500 points!
    //     </Text>
    //   </View>
      <View style={styles.container}>
      <View style={styles.content}>
      <View style={styles.card}>
        <Text style={styles.messageTitle}>action saved for later</Text>
        <Text style={styles.messageDescription}>Come back to complete this action within 7 days and gain +500 points!</Text>
      </View>
      </View>
      <TouchableOpacity
        style={styles.okButton}
        onPress={() => navigation.navigate('Dashboard', { userName, userFirstName, userLastName })}
      >
        <Text style={styles.okButtonText}>Ok</Text>
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
      content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginTop: '40px',
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
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     backgroundColor: '#f7f7f7',
//     marginBottom: 20,
//   },
//   card: {
//     width: '90%',
//     backgroundColor: '#f8f8f8',
//     borderRadius: 6,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
  messageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 600,
    lineHeight: 22, 
  },
  messageDescription: {
    color: '#000',
    textAlign: 'center',
fontSize: 16,
fontStyle: 'normal',
fontWeight: 500,
lineHeight: 22,
  },

  okButton: {
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  
});

export default ExitTakingAction;
