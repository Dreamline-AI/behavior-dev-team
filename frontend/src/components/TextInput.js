import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'

export default function TextInput({ title, errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        outlineColor="rgba(0, 0, 0, 0.1)" // Default border color
        activeOutlineColor="rgba(0, 0, 0, 0.6)" // Border color when focused
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 4,
    color: 'black',
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'left',
    fontStyle: 'normal',
  },
})
