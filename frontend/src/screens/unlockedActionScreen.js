import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
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

const UnlockedActionScreen = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.unlockedActionScreen.container}>
        <View style={styles.unlockedActionScreen.box}>
          <MaterialIcons name="celebration" size={80} />
          <Text>Yay !</Text>
          <Text style={styles.unlockedActionScreen.text2}>
            you have unlocked an action! completing it will double your points !
          </Text>
        </View>
        <View style={styles.unlockedActionScreen.buttonsContainer}>
          <TouchableOpacity style={styles.unlockedActionScreen.button}>
            <Text>Do it later</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.unlockedActionScreen.button}>
            <Text>Do it later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  )
}

export default UnlockedActionScreen
