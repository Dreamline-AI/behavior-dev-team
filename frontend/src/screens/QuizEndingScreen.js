import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import Button from '../components/Button'
import Background from '../components/Background'
import { Text } from 'react-native-paper'
import styles from '../commonStyles'

export default function QuizEndingScreen({ route, navigation }) {
  const { userName } = route.params || {}
  return (
    <Background>
      <View style={styles.quizEndingScreen.iconContainer}>
        <Text style={styles.quizEndingScreen.text}>
          Congrats on successfully completing this trivia!
        </Text>
        <Image
          source={require('../assets/slay.png')}
          style={styles.quizEndingScreen.image}
        />
        <Text style={styles.quizEndingScreen.score}>+250</Text>
      </View>
      <Button
        color="rgba(98, 218, 103, 1)"
        mode="contained"
        onPress={() =>
          navigation.navigate('QuizStreakScreen', { userName: userName })
        }
        labelStyle={{ color: 'white', textTransform: 'none', fontSize: 16 }}
        style={[styles.quizEndingScreen.button, { marginTop: '350' }]}
        uppercase={false}
      >
        Finish
      </Button>
    </Background>
  )
}
