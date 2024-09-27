import React from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Circle, Svg } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const radius = 20
const circumference = radius * Math.PI * 2

const CircularProgressBar = ({ progress }) => {
  const strokeOffset = useSharedValue(circumference)

  // Calculate the stroke offset based on the progress value
  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(
        circumference - (progress / 100) * circumference,
        {
          duration: 1000, // You can adjust this duration for smoothness
        }
      ),
    }
  })

  return (
    <Svg width={80} height={80} viewBox="0 0 80 80">
      <Circle
        cx="40"
        cy="40"
        r={radius}
        stroke="#F5F5F5"
        strokeWidth="6"
        fill="#F5F5F5"
      />
      <AnimatedCircle
        animatedProps={animatedCircleProps}
        cx="40"
        cy="40"
        r={radius}
        stroke="black"
        strokeWidth="6"
        fill="transparent"
        strokeDasharray={`${circumference}`}
      />
    </Svg>
  )
}

export default CircularProgressBar
