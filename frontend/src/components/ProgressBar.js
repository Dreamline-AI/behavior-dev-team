import React, { useEffect, useRef } from 'react'
import { View, Animated, StyleSheet, Easing } from 'react-native'

const ProgressBar = ({ progress }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start()
  }, [progress])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.filler,
          {
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: '100%',
    backgroundColor: '#d9d9d9',
    borderRadius: 6,
    overflow: 'hidden',
  },
  filler: {
    height: '100%',
    backgroundColor: 'black',
    borderRadius: 6,
  },
})

export default ProgressBar
