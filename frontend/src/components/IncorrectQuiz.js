import React from 'react'
import Quiz from '../components/Quiz'

const IncorrectQuiz = ({ incorrectQuestions, navigation }) => {
  return <Quiz questions={incorrectQuestions} navigation={navigation} />
}
export default IncorrectQuiz
