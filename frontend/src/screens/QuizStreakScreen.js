import React from 'react';
import Background from '../components/Background';
import { View, StyleSheet, Text } from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import { UserPic } from '../components/UserPic';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function QuizStreakScreen({ route, navigation }) {
  const { userName } = route.params;

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <Background>
      <Logo />
      <View style={styles.userInfoContainer}>
        <UserPic name={userName} />
      </View>
      <Header style={styles.header}>You started a streak!</Header>
      <View style={styles.lightningContainer}>
        {daysOfWeek.map((day, index) => (
          <View key={index} style={styles.lightningDayContainer}>
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={30}
              color={'rgba(217, 217, 217, 1)'}
              style={styles.lightningIcon}
            />
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>
     
      <Button
        mode="outlined"
        style={[styles.button]}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Logout
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  lightningContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  lightningDayContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  lightningIcon: {
    marginRight: 5,
  },
  dayText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
