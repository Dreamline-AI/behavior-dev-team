import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../commonStyles'
import celebrate from '../assets/celebrate.png'
import { addVoltCoins } from '../actions/authActions'
import Background from '../components/Background'

const TriviatoActionConnect = ({ navigation, route }) => {
  const { userName, userFirstName, userLastName } = route.params
  const dispatch = useDispatch()
  const voltCoins = useSelector((state) => state.auth.user.voltCoins)

  console.log('Initial Volt Coins:', voltCoins)

  const handleDonePress = () => {
    const earnedPoints = 500
    dispatch(addVoltCoins(earnedPoints))
    navigation.navigate('Dashboard', { userName, userFirstName, userLastName })
  }

  return (
    <Background>
      <View style={styles.triviaToActionConnect.container}>
        <View style={styles.triviaToActionConnect.content}>
          <View style={styles.triviaToActionConnect.card}>
            <Image
              source={celebrate}
              style={styles.triviaToActionConnect.celebrate}
            />
            <Text style={styles.triviaToActionConnect.coinsText}>
              +500 coins
            </Text>
            <Text style={styles.triviaToActionConnect.messageText}>
              Congrats on completing an action!
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.triviaToActionConnect.doneButton}
          onPress={handleDonePress}
        >
          <Text style={styles.triviaToActionConnect.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

export default TriviatoActionConnect