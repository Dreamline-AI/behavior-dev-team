import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const LoadScreen = () => {
  const dotOpacity1 = useRef(new Animated.Value(1)).current;
  const dotOpacity2 = useRef(new Animated.Value(1)).current;
  const dotOpacity3 = useRef(new Animated.Value(1)).current;
  const dotOpacity4 = useRef(new Animated.Value(1)).current;
  const dotOpacity5 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(dotOpacity1, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dotOpacity1, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dotOpacity2, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dotOpacity2, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dotOpacity3, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dotOpacity3, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dotOpacity4, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dotOpacity4, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dotOpacity5, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dotOpacity5, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };

    animate();
  }, [dotOpacity1, dotOpacity2, dotOpacity3, dotOpacity4, dotOpacity5]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, { opacity: dotOpacity1 }]} />
      <Animated.View style={[styles.dot, { opacity: dotOpacity2 }]} />
      <Animated.View style={[styles.dot, { opacity: dotOpacity3 }]} />
      <Animated.View style={[styles.dot, { opacity: dotOpacity4 }]} />
      <Animated.View style={[styles.dot, { opacity: dotOpacity5 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -48 }, { translateY: -4 }],
    flexDirection: 'row',
    width: 96,
    height: 8,
    justifyContent: 'space-between',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'lightgrey',
  },
});

export default LoadScreen;
