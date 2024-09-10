import React, { useState, useEffect, useRef } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Pressable,
  Image,
  Easing,
} from 'react-native'
import data from '../helpers/data'
import Button from '../components/Button'
import * as Progress from 'react-native-progress'
import IncorrectQuiz from './IncorrectQuiz'
import styles from '../commonStyles'
import x from '../assets/x.png'
import ProgressBar from '../components/ProgressBar'
import Background from './Background'

const Quiz = ({ navigation, route }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isCorrect, setIsCorrect] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [quizProgress, setQuizProgress] = useState(data.length)
  const translateY = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(1)).current
  const [showMessage, setShowMessage] = useState(false)
  const [customMessage, setCustomMessage] = useState('')
  const [incorrectIndices, setIncorrectIndices] = useState([])
  const [incorrectQuestions, setIncorrectQuestions] = useState([])

  useEffect(() => {
    if (route && route.params && route.params.incorrectIndices) {
      const { incorrectIndices } = route.params
      setIncorrectQuestions(
        data.filter((_, index) => incorrectIndices.includes(index))
      )
    }
  }, [route])

  useEffect(() => {
    if (selectedOption !== null) {
      fadeOut()
    }
  }, [selectedOption])

  const progress = (currentQuestionIndex + 1) / quizProgress

  const handleNext = () => {
    if (currentQuestionIndex === data.length - 1) {
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
      fadeAnim.setValue(1)
      translateY.setValue(0)
      setShowMessage(false)
      setCustomMessage('')
    }
  }

  const fadeOut = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setShowMessage(true))
  }

  const moveCardUp = (selectedOption) => {
    const currentQuestion = data[currentQuestionIndex]
    const correctOption = currentQuestion.options[0]
    let toValue = selectedOption === correctOption ? -80 : -280

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: toValue,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handlePressedOption = (pressedOption) => {
    const currentQuestion = data[currentQuestionIndex]
    const isAnswerCorrect = currentQuestion.correct_option === pressedOption
    setIsCorrect(isAnswerCorrect)
    setSelectedOption(pressedOption)
    moveCardUp(pressedOption)
    fadeOut()

    if (!isAnswerCorrect) {
      setIncorrectIndices([...incorrectIndices, currentQuestionIndex])
      console.log('Incorrect Indices:', incorrectIndices)
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

  return (
    <Background>
      <View style={styles.quiz.topProgressBarContainer}>
        <Image source={x} style={styles.quiz.x} />
        <ProgressBar progress={progress * 100} />
      </View>

      <Animated.View
        style={[{ opacity: selectedOption !== null ? fadeAnim : 1 }]}
      >
        <View style={styles.quiz.questionContainer}>
          <Text style={styles.quiz.question}>
            {data[currentQuestionIndex].question}
          </Text>
        </View>
      </Animated.View>

      {data[currentQuestionIndex].options.map((option) => (
        <Animated.View
          key={option}
          style={[
            {
              opacity: selectedOption !== option ? fadeAnim : 1,
              transform:
                selectedOption === option ? [{ translateY: translateY }] : null,
            },
          ]}
        >
          <Text
            style={
              isCorrect ? styles.quiz.correctMessage : styles.quiz.wrongMessage
            }
          >
            {isCorrect !== null ? (isCorrect ? 'Correct! ' : 'No') : ''}
          </Text>
          <Pressable
            style={[
              styles.quiz.AnswerBox,
              selectedOption === option &&
                (isCorrect ? styles.quiz.correctBox : styles.quiz.wrongBox),
            ]}
            onPress={() => handlePressedOption(option)}
            disabled={selectedOption}
            key={option}
          >
            <Text style={styles.quiz.answerText}>{option}</Text>
          </Pressable>
        </Animated.View>
      ))}

      <Text style={styles.quiz.customMessage}>{customMessage}</Text>

      <Button
        color="black"
        mode="contained"
        onPress={handleNext}
        disabled={!selectedOption}
        style={[
          styles.quiz.button,
          !selectedOption ? styles.quiz.disabledButton : null,
        ]}
        labelStyle={!selectedOption ? styles.quiz.disabledButtonText : null}
      >
        Continue
      </Button>
    </Background>
  )
}

export default Quiz
