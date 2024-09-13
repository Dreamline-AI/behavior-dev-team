import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Background from '../components/Background'
import styles from '../commonStyles'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import LoadScreen from './LoadScreen'
import { emailValidator } from '../helpers/emailValidator'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {
  signInWithGooglePopup,
  signInWithFacebookPopup,
} from '../../firebaseConfig'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import celebrate from '../assets/celebrate.png'

const UnlockedActionScreen = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.unlockedActionScreen.container}>
        <View style={styles.unlockedActionScreen.box}>
          <Image
            source={celebrate}
            style={styles.triviaToActionConnect.celebrate}
          />

          <Text style={styles.unlockedActionScreen.text1}>Yay !</Text>
          <Text style={styles.unlockedActionScreen.text2}>
            you have unlocked an action! completing it will double your points !
          </Text>
        </View>

        <View style={styles.unlockedActionScreen.buttonsContainer}>
          <TouchableOpacity
            style={styles.unlockedActionScreen.buttonLater}
            onPress={() => {
              navigation.navigate('Dashboard')
            }}
          >
            <Text style={styles.unlockedActionScreen.buttonLaterText}>
              Do it later
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.unlockedActionScreen.buttonAction}
            onPress={() => {
              navigation.navigate('TakeActionScreen')
            }}
          >
            <Text style={styles.unlockedActionScreen.buttonActionText}>
              Take Action
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  )
}

export default UnlockedActionScreen
