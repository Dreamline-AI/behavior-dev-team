import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

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
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/chevron-left.svg')}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 16,
  },
  image: {
    width: 24,
    height: 24,
  },
});
