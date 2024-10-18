import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme';
import styles from "../commonStyles";

export default function Header(props) {
  return <Text style={styles.header.header} {...props} />
}


