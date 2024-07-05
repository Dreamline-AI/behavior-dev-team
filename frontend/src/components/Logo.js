import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/logoo.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 139.47,
    height: 139.47,
    marginBottom: 8,
  },
})
