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
      {/* Full background bar (always visible) */}
      <View style={styles.backgroundBar} />

      {/* Filler (progress part of the bar) */}
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      >
        {/* Circle at the end of the filler */}
        <View style={styles.circleContainer}>
          <Animated.View style={styles.circle} />
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 16,
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  backgroundBar: {
    height: 8,
    width: '100%',
    backgroundColor: '#d9d9d9',
    borderRadius: 6,
    position: 'absolute',
    flex: 1,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#2e2d2d',
    borderRadius: 6,
    position: 'relative',
    width: '100%',
  },
  circleContainer: {
    position: 'absolute',
    right: -8,
    top: -4,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#2e2d2d',
  },
})

export default ProgressBar
