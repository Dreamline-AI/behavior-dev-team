import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native'
import data from '../helpers/data'
import Button from '../components/Button'
import * as Progress from 'react-native-progress'
import IncorrectQuiz from './IncorrectQuiz'
import styles from '../commonStyles'
import x from '../assets/x.png'
import wifi from '../assets/wifi.png'
import time from '../assets/time.png'
import battery from '../assets/battery.png'
import cellular from '../assets/cellular.png'
import ProgressBar from '../components/ProgressBar'
import Background from './Background'

const Quiz = ({ navigation, route, questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isCorrect, setIsCorrect] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [incorrectIndices, setIncorrectIndices] = useState([])
  const [incorrectQuestions, setIncorrectQuestions] = useState([])
  const [animation] = useState(new Animated.Value(0))
  const [customMessage, setCustomMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false) // Define showMessage state
  const quizData =
    questions ||
    (incorrectQuestions.length > 0 ? incorrectQuestions : data) ||
    []
  const quizProgress = quizData.length

  useEffect(() => {
    if (route?.params?.incorrectIndices) {
      const { incorrectIndices } = route.params
      setIncorrectQuestions(
        data.filter((_, index) => incorrectIndices.includes(index)) || []
      )
    }
  }, [route])

  useEffect(() => {
    if (selectedOption !== null) {
      setShowMessage(true)
      Animated.timing(animation, {
        toValue: -54, // Move up by 54 units
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start()
    }
  }, [selectedOption])

  const progress = (currentQuestionIndex + 1) / (quizProgress || 1)

  const handleNext = () => {
    if (currentQuestionIndex === quizData.length - 1) {
      if (incorrectIndices.length > 0) {
        navigation.navigate('RedoQuestionsScreen', {
          incorrectIndices: incorrectIndices,
          progress: progress,
        })
      } else {
        navigation.navigate('QuizEndingScreen')
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setIsCorrect(null)
      setShowMessage(false)
      setCustomMessage('') // Clear custom message
      animation.setValue(0) // Reset animation value
    }
  }

  const handlePressedOption = (pressedOption) => {
    const currentQuestion = quizData[currentQuestionIndex]
    const isAnswerCorrect = currentQuestion.correct_option === pressedOption
    setIsCorrect(isAnswerCorrect)
    setSelectedOption(pressedOption)

    if (!isAnswerCorrect) {
      setIncorrectIndices([...incorrectIndices, currentQuestionIndex])
      setCustomMessage(currentQuestion.wrong_message)
    } else {
      setCustomMessage(currentQuestion.correct_message)
    }
  }

  if (incorrectQuestions.length > 0) {
    return (
      <View style={styles.quiz.container}>
        <IncorrectQuiz
          incorrectQuestions={incorrectQuestions}
          navigation={navigation}
          handleNext={handleNext}
          handlePressedOption={handlePressedOption}
          selectedOption={selectedOption}
          isCorrect={isCorrect}
          setIsCorrect={setIsCorrect}
        />
      </View>
    )
  }

  const animatedStyle = {
    transform: [{ translateY: animation }],
  }

  return (
    <Background>
      <View style={styles.quiz.mainFrame}>
        <View style={styles.quiz.topPartFrame}>
          <View style={styles.quiz.topBarContainer}>
            <Image source={wifi} style={styles.quiz.wifi} />
            <Image source={cellular} style={styles.quiz.cellular} />
            <Image source={battery} style={styles.quiz.battery} />
            <Image source={time} style={styles.quiz.time} />
          </View>
          <View style={styles.quiz.ProgressBarContainer}>
            <Image source={x} style={styles.quiz.x} />
            <ProgressBar progress={progress * 100} />
          </View>
        </View>

        <View style={styles.quiz.containerQA}>
          {selectedOption === null && (
            <View style={styles.quiz.questionContainer}>
              <Text style={styles.quiz.question}>
                {quizData[currentQuestionIndex]?.question ||
                  'No question available'}
              </Text>
            </View>
          )}

          {quizData[currentQuestionIndex]?.options.map((option, index) => {
            if (selectedOption === null || option === selectedOption) {
              return (
                <View key={option} style={styles.quiz.answerCardParent}>
                  <Animated.View
                    style={[styles.quiz.answerCardParent, animatedStyle]}
                  >
                    <Text
                      style={
                        isCorrect
                          ? styles.quiz.correctMessage
                          : styles.quiz.wrongMessage
                      }
                    >
                      {isCorrect !== null
                        ? isCorrect
                          ? 'Correct! '
                          : 'No'
                        : ''}
                    </Text>

                    {/* Pressable for options */}
                    {index === 0 && (
                      <TouchableOpacity
                        style={[
                          styles.quiz.AnswerBox,
                          selectedOption === option &&
                            (isCorrect
                              ? styles.quiz.correctBox
                              : styles.quiz.wrongBox),
                        ]}
                        onPress={() => handlePressedOption(option)}
                        disabled={selectedOption}
                      >
                        <View>
                          <Text style={styles.quiz.answerText}>{option}</Text>
                        </View>
                      </TouchableOpacity>
                    )}

                    {index === 1 && (
                      <Pressable
                        style={[
                          styles.quiz.AnswerBox,
                          selectedOption === option &&
                            (isCorrect
                              ? styles.quiz.correctBox
                              : styles.quiz.wrongBox),
                        ]}
                        onPress={() => handlePressedOption(option)}
                        disabled={selectedOption}
                      >
                        <View>
                          <Text style={styles.quiz.answerText}>{option}</Text>
                        </View>
                      </Pressable>
                    )}
                  </Animated.View>

                  {selectedOption !== null && (
                    <Animated.View
                      style={[styles.quiz.answerBody, animatedStyle]}
                    >
                      <Text style={styles.quiz.customMessage}>
                        {customMessage}
                      </Text>
                    </Animated.View>
                  )}
                </View>
              )
            }
            return null
          })}
        </View>

        {selectedOption !== null && (
          <Button
            color="black"
            mode="contained"
            onPress={handleNext}
            style={styles.quiz.button}
          >
            Continue
          </Button>
        )}
      </View>
    </Background>
  )
}

export default Quiz
