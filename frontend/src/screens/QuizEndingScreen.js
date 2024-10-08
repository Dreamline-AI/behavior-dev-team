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
      <Text style={styles.quizEndingScreen.text}>
        Congrats on successfully completing this trivia!
      </Text>
      <View style={styles.quizEndingScreen.frame}>
        <Image
          source={require('../assets/Ellipse.png')}
          style={styles.quizEndingScreen.circle}
          resizeMode="cover"
        />
        <View style={styles.quizEndingScreen.wrapper}>
          <Text style={styles.quizEndingScreen.score}>+250</Text>
        </View>
        <Image
          source={require('../assets/Lightning.png')}
          style={styles.quizEndingScreen.lightning}
          resizeMode="cover"
        />
      </View>

      <Button
        color="rgba(98, 218, 103, 1)"
        mode="contained"
        onPress={() =>
          navigation.navigate('QuizStreakScreen', { userName: userName })
        }
        labelStyle={{ color: 'white' }}
        style={styles.quizEndingScreen.button}
        uppercase={false}
      >
        Finish
      </Button>
    </Background>
  )
}
