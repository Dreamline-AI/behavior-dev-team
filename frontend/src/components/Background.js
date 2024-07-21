import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { theme } from '../core/theme'

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    // padding: 0,
    // paddingHorizontal: 5,
    paddingVertical: 18,
    width: 390,
    height: 262,
    top: 0,
    // gap: 13,
          // width: '100%',
          // height: 'auto',
          // gap: 13,
    maxWidth: 340,
    alignSelf: 'center',
  },
})
