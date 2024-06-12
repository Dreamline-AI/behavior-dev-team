import React from "react";
import { View, Text } from "react-native";
import Background from "../components/Background";
import Quiz from "../components/Quiz";

const QuizScreen = ({ navigation }) => {
  return (
    <Background>
      <Quiz navigation={navigation} />
    </Background>
  );
};

export default QuizScreen;
