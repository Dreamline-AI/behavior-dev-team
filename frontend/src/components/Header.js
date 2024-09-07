import React from 'react'
import { StyleSheet, Text } from 'react-native'
//import { Text } from 'react-native-paper'
//import { theme } from '../core/theme'
//import styles from '../commonStyles'

export default function Header({ title }) {
  return <Text style={styles.headerText}> {title} </Text>
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
