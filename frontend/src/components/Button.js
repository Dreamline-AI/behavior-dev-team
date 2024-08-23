import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme';
import styles from "../commonStyles"

export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button.button,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
        style,
      ]}
      labelStyle={styles.button.text}
      mode={mode}
      {...props}
    />
  )
}


