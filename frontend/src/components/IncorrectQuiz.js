import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Pressable} from "react-native";
import * as Progress from 'react-native-progress';
import Button from '../components/Button';
import styles from "../commonStyles";


const IncorrectQuiz = ({ incorrectQuestions, navigation }) => {
    const translateY = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [customMessage, setCustomMessage] = useState("");



 

    useEffect(() => {
        if (selectedOption !== null) {
            fadeOut();
        }
    }, [selectedOption]);

 

    const moveCardUp = (selectedOption) => {
        const currentQuestion = incorrectQuestions[currentIndex];
        const correctOption = currentQuestion.options[0];
        let toValue = selectedOption === correctOption ? -80 : -280;

        Animated.parallel([
            Animated.timing(translateY, {
                toValue: toValue,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    };
    const fadeOut = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start(() => setShowMessage(true));
    };


  const handleNext = () => {
    if (currentIndex === incorrectQuestions.length - 1) {
        navigation.navigate('QuizEndingScreen');
    } else {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
        setIsCorrect(null);
        fadeAnim.setValue(1);
        translateY.setValue(0);
        setShowMessage(false);
        setCustomMessage(""); 
    }
};

    const handlePressedOption = (pressedOption) => {
        const currentQuestion = incorrectQuestions[currentIndex];
        const isAnswerCorrect = currentQuestion.correct_option === pressedOption;
        setIsCorrect(isAnswerCorrect);
        setSelectedOption(pressedOption);
        moveCardUp(pressedOption);
        fadeOut();
    
        if (!isAnswerCorrect) {
            setCustomMessage(currentQuestion.wrong_message);
        } else {
            setCustomMessage(currentQuestion.correct_message);
        }
    };
    

 

    if (incorrectQuestions.length === 0) {
        return (
            <View style={styles.incorrectQuiz.container}>
                <Button title="Continue" onPress={handleNext} />
            </View>
        );
    }

    const question = incorrectQuestions[currentIndex];



    return (
        <View style={styles.incorrectQuiz.container}>
            
            <View style={styles.incorrectQuiz.progressBarContainer}>
                <Progress.Bar progress={(currentIndex + 1) / incorrectQuestions.length} width={350} color='black' unfilledColor='rgba(217, 217, 217, 1)' borderWidth={0} height={8} />
            </View>
          
            <Animated.View
                style={[{ opacity: selectedOption !== null? fadeAnim : 1 },]}
            >
                <Text style={styles.incorrectQuiz.question}>{question.question}</Text>
            </Animated.View>
    
            {question.options.map((option) => (
                <Animated.View 
                key={option}
                  style={[
                    {
                        opacity: selectedOption !== option ? fadeAnim : 1,
                        transform: selectedOption === option ? [{ translateY: translateY }] : null,
                    },
                ]}
                >
            
            <Text style={isCorrect ? styles.incorrectQuiz.correctMessage : styles.incorrectQuiz.wrongMessage}>
                {isCorrect !== null ? (isCorrect ? "Correct! " : "No") : ""}
            </Text>
                        
            <Pressable
            style={[
                styles.incorrectQuiz.AnswerBox,
                selectedOption === option && (isCorrect ? styles.incorrectQuiz.correctBox : styles.incorrectQuiz.wrongBox),
            ]}
            onPress={() => handlePressedOption(option)}
            disabled={selectedOption}
            key={option}>   
            
            <Text style={styles.incorrectQuiz.answerText}>{option}</Text>
            </Pressable>
            </Animated.View>
        ))} 
        
            <Button
                color="black"
                mode="contained"
                onPress={handleNext}
                disabled={!selectedOption} 
                style={[styles.incorrectQuiz.button, !selectedOption ? styles.incorrectQuiz.disabledButton : null]} 
                labelStyle={!selectedOption ? styles.incorrectQuiz.disabledButtonText : null} 
            >
                Continue
            </Button>

        </View>
    );
};

export default IncorrectQuiz;


