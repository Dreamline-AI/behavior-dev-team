import React from 'react'
import { Image, StyleSheet } from 'react-native'
import styles from "../commonStyles"

export default function Logo() {
  return <Image source={require('../assets/logoo.png')} style={styles.logo.image} />
}

