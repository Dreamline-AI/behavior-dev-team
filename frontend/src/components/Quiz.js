import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native'
import ProgressBar from '../components/ProgressBar'
import CircularProgressBar from './CircularProgressBar'
import Background from './Background'
import data from '../helpers/data'
import styles from '../commonStyles'
import Button from '../components/Button'
import IncorrectQuiz from './IncorrectQuiz'
import x from '../assets/x.png'
import wifi from '../assets/wifi.png'
import time from '../assets/time.png'
import battery from '../assets/battery.png'
import cellular from '../assets/cellular.png'

const Quiz = ({ navigation, route, questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isCorrect, setIsCorrect] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [incorrectIndices, setIncorrectIndices] = useState([])
  const [incorrectQuestions, setIncorrectQuestions] = useState([])
  const [animation] = useState(new Animated.Value(0))
  const [customMessage, setCustomMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)

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
        toValue: -54,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start()
    }
  }, [selectedOption])

  // Calculate the progress percentage
  const progress = ((currentQuestionIndex + 1) / (quizProgress || 1)) * 100

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
      setCustomMessage('')
      animation.setValue(0)
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
            {/* Pass progress to both ProgressBar and CircularProgressBar */}
            <ProgressBar progress={progress} />
            <CircularProgressBar progress={progress} />
          </View>
        </View>
        <View style={styles.quiz.frame1}>
          <View style={styles.quiz.containerQA}>
            {selectedOption === null && (
              <View style={styles.quiz.questionContainer}>
                <Text style={styles.quiz.question}>
                  {quizData[currentQuestionIndex]?.question ||
                    'No question available'}
                </Text>
              </View>
            )}

            {quizData[currentQuestionIndex]?.options.map((option) =>
              selectedOption === null || option === selectedOption ? (
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
              ) : null
            )}
          </View>
          <View style={styles.quiz.bottomContainer}>
            <View style={styles.quiz.bottomTop}>
              <CircularProgressBar progress={progress} />
            </View>
            <View style={styles.quiz.bottomBottom}></View>
          </View>
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
