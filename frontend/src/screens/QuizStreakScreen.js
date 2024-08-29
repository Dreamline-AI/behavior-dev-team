import React from 'react'
import Background from '../components/Background'
import { View, StyleSheet, Text } from 'react-native'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import { UserPic } from '../components/UserPic'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from '../commonStyles'

export default function QuizStreakScreen({ route, navigation }) {
  const { userName } = route.params

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <Background>
      <View style={styles.quizStreakScreen.userInfoContainer}>
        <UserPic name={userName} />

        <View style={{ marginBottom: 24 }}>
          <Header
            style={styles.quizStreakScreen.header}
            title="You started a streak!"
          />
        </View>
      </View>

      <View style={styles.quizStreakScreen.lightningContainer}>
        {daysOfWeek.map((day, index) => (
          <View
            key={index}
            style={styles.quizStreakScreen.lightningDayContainer}
          >
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={30}
              color={'rgba(217, 217, 217, 1)'}
              style={styles.quizStreakScreen.lightningIcon}
            />
            <Text style={styles.quizStreakScreen.dayText}>{day}</Text>
          </View>
        ))}
      </View>

      <Button
        mode="outlined"
        style={[styles.quizStreakScreen.button]}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'UnlockedActionScreen' }],
          })
        }
        labelStyle={{ color: 'white' }}
      >
        Logout
      </Button>
    </Background>
  )
}
