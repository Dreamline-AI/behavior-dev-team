import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import styles from "../commonStyles"

export default function Paragraph(props) {
  return <Text style={styles.paragraph.text} {...props} />
}

