import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Pressable} from "react-native";
import * as Progress from 'react-native-progress';
import Button from '../components/Button';


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
            <View style={styles.container}>
                <Button title="Continue" onPress={handleNext} />
            </View>
        );
    }

    const question = incorrectQuestions[currentIndex];



    return (
        <View style={styles.container}>
            
            <View style={styles.progressBarContainer}>
                <Progress.Bar progress={(currentIndex + 1) / incorrectQuestions.length} width={350} color='black' unfilledColor='rgba(217, 217, 217, 1)' borderWidth={0} height={8} />
            </View>
          
            <Animated.View
                style={[{ opacity: selectedOption !== null? fadeAnim : 1 },]}
            >
                <Text style={styles.question}>{question.question}</Text>
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
            
            <Text style={isCorrect ? styles.correctMessage : styles.wrongMessage}>
                {isCorrect !== null ? (isCorrect ? "Correct! " : "No") : ""}
            </Text>
                        
            <Pressable
            style={[
                styles.AnswerBox,
                selectedOption === option && (isCorrect ? styles.correctBox : styles.wrongBox),
            ]}
            onPress={() => handlePressedOption(option)}
            disabled={selectedOption}
            key={option}>   
            
            <Text style={styles.answerText}>{option}</Text>
            </Pressable>
            </Animated.View>
        ))} 
        
            <Button
                color="black"
                mode="contained"
                onPress={handleNext}
                disabled={!selectedOption} 
                style={[styles.button, !selectedOption ? styles.disabledButton : null]} 
                labelStyle={!selectedOption ? styles.disabledButtonText : null} 
            >
                Continue
            </Button>

        </View>
    );
};

export default IncorrectQuiz;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
    },
    AnswerBox: {
        width: 361,
        height: 214,
        borderWidth: 3,
        borderRadius: 6,
        borderColor: 'rgba(0, 0, 0, 0.05)',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        alignItems: 'center',
        justifyContent: 'center', 
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

    correctMessage: {
        color: 'rgba(98, 218, 103, 1)',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 30,
    },
    wrongMessage: {
        color: 'rgba(255, 72, 15, 1)',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    customMessage: {
        color: 'black',
        fontSize: 16,
        position: 'absolute',
        top: 390, 
        width: '100%',
        textAlign: 'left', 

    },
    disabledButton: {
        backgroundColor: 'black',
    },
    disabledButtonText: {
        color: 'white', 
    },
});
