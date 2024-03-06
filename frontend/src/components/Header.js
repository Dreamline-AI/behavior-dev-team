import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Header(props) {
  return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: theme.colors.greet,
    fontWeight: 'bold',
    paddingVertical: 12,
    width: '139.47',
    height: 'auto',
    padding: 32,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 0,
    gap: 8,
    alignSelf: 'center', 
    alignItems: 'center',
    justifyContent: 'center',
    },
})
