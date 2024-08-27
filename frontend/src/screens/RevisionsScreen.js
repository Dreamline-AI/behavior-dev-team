import React from 'react'
import Background from '../components/Background'
import Quiz from '../components/Quiz'
import BackButton from '../components/BackButton'
import Header from '../components/Header'
import { Text } from 'react-native-paper'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import styles from '../commonStyles'

const RevisionsScreen = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.revisionsScreen.topNav}>
        <BackButton goBack={navigation.goBack} />
        <View style={styles.revisionsScreen.header}>
          <Header title="Revisions" />
        </View>
      </View>
      <Text style={styles.revisionsScreen.question}>
        How many questions would you like to revisit?
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('QuizScreen')}
        style={styles.revisionsScreen.box}
      >
        <Text style={styles.revisionsScreen.title1}> 10 questions </Text>
        <Text style={styles.revisionsScreen.title2}> 10 XP</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.revisionsScreen.box}>
        <Text style={styles.revisionsScreen.title1}> 50 questions </Text>
        <Text style={styles.revisionsScreen.title2}> 50 XP</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.revisionsScreen.box}>
        <Text style={styles.revisionsScreen.title1}> All questions </Text>
        <Text style={styles.revisionsScreen.title2}> 1 XP per question</Text>
      </TouchableOpacity>
    </Background>
  )
}

const localStyles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    //alignItems: 'center',
    // justifyContent: 'center',
  },
})

export default RevisionsScreen
