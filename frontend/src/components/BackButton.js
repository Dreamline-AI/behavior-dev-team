import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styles from "../commonStyles";

export default function BackButton() {
  const navigation = useNavigation();
  const navState = useNavigationState(state => state);

  const goBack = () => {
    if (navState.index > 0) {
      navigation.goBack();
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'StartScreen' }],
      });
    }
  };

  return (
    <TouchableOpacity onPress={goBack} style={styles.backButton.container}>
      <Image
        style={styles.backButton.image}
        source={require('../assets/chevron-left.svg')}
      />
    </TouchableOpacity>
  );
}


