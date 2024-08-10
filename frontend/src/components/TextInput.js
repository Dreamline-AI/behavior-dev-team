import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'
import styles from "../commonStyles"

export default function TextInput({ title, errorText, description, ...props }) {
  return (
    <View style={styles.textInput.container}>
      <Text style={styles.textInput.title}>{title}</Text>
      <Input
        style={styles.textInput.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        outlineColor="rgba(0, 0, 0, 0.1)"
        activeOutlineColor="rgba(0, 0, 0, 0.6)"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.textInput.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.textInput.error}>{errorText}</Text> : null}
    </View>
  )
}

