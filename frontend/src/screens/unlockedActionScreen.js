import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Background from '../components/Background'
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
import 'react-toastify/dist/ReactToastify.css'
import styles from '../commonStyles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const unlockedActionScreen = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.unlockedActionScreen.container}>
        <View style={styles.unlockedActionScreen.box}>
          <MaterialIcons name="celebration" size={80} />
          <Text> Yay !</Text>
          <Text>
            you have unlocked an action! completing it will double your points!
          </Text>
        </View>
        <View style={styles.unlockedActionScreen.buttonsContainer}>
          <Button
            mode="outlined"
            style={[styles.unlockedActionScreen.button2]}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
              })
            }
            labelStyle={{ color: 'black' }}
          >
            Do it later
          </Button>

          <Button
            mode="outlined"
            style={[styles.unlockedActionScreen.button]}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'TakeActionScreen' }],
              })
            }
            labelStyle={{ color: 'white' }}
          >
            Take action
          </Button>
        </View>
      </View>
    </Background>
  )
}

export default unlockedActionScreen
