import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, Animated, Pressable  } from "react-native";
import data from "../helpers/data";
import Button from '../components/Button';
import * as Progress from 'react-native-progress';

const Quiz = ({navigation}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [quizProgress, setQuizProgress] = useState(data.length);
    const translateY = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (selectedOption !== null) {
            fadeOut();
        }
    }, [selectedOption]);

    const progress = (currentQuestionIndex + 1) / quizProgress;

    const handleNext = () => {
        if(currentQuestionIndex === data.length -1 ){
            navigation.navigate("QuizEndingScreen");
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsCorrect(null);
            fadeAnim.setValue(1); 
            translateY.setValue(0); 
        }
    };

    const fadeOut = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start();
    };

    const moveCardUp = (selectedOption) => {
        const currentQuestion = data[currentQuestionIndex];
        const correctOption = currentQuestion.options[0]; 
        let toValue = selectedOption === correctOption ? -50 : -250;
    
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: toValue, 
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePressedOption = (pressedOption) => {
        const isAnswerCorrect = data[currentQuestionIndex].correct_option === pressedOption;
        setIsCorrect(isAnswerCorrect);
        setSelectedOption(pressedOption);
        moveCardUp(pressedOption); 
       
    };

   
    return(
        <View style={styles.container}>

            <View style={styles.progressBarContainer}>
                <Progress.Bar progress={progress} width={350} color= 'black' unfilledColor='rgba(217, 217, 217, 1)' borderWidth={0} height={8}  />
            </View> 

        <Animated.View
            style={[{ opacity: selectedOption !== null ? fadeAnim : 1},]}
            >
        <Text style={styles.question}>{data[currentQuestionIndex].question}</Text>
        </Animated.View>
                {data[currentQuestionIndex].options.map((option) => (
                <Animated.View
                key={option}
                style={[
                  {
                    opacity: selectedOption !== option ? fadeAnim : 1,
                    transform: selectedOption === option ? [{ translateY: translateY }]: null,
                  },
                ]}
              >


  <Pressable
    style={[
      styles.AnswerBox,
      selectedOption === option && (isCorrect ? styles.correctBox : styles.wrongBox),
    ]}
    onPress={() => handlePressedOption(option)}
    disabled={selectedOption}
    key={option}
  >
    <Text style={styles.answerText}>{option}</Text>
  </Pressable>
  </Animated.View>
))}
            <Button
                color="black"
                mode="contained"
                onPress={handleNext}
            >
                Continue
            </Button>
        </View>
    );
}

export default Quiz;

const styles = StyleSheet.create({
    AnswerBox: {
        width: 361,
        height: 214,
        borderWidth: 3,
        borderRadius: 6,
        borderColor: 'rgba(0, 0, 0, 0.05)',
        backgroundColor: 'rgba(0, 0, 0, 0.05)', 
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10, 
    },

    answerText: {
        textAlign: 'center',
        fontSize: 24,
    },
    question: {
        marginBottom: 10,
        fontSize: 18, 
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    correctBox: {
        borderColor: 'rgba(19, 212, 2, 1)', 
    },
    wrongBox: {
        borderColor: 'rgba(241, 58, 0, 1)', 
    },
    progressBarContainer: {
        width: '100%',
        height: 20,
        marginBottom: 30,
    },
});

