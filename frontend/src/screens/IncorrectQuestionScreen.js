
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Background from '../components/Background';
import IncorrectQuiz from '../components/IncorrectQuiz'; 
import data from '../helpers/data'; 
import styles from "../commonStyles"

export default function IncorrectQuestionsScreen({ navigation, route }) {
    const [incorrectQuestions, setIncorrectQuestions] = useState([]);

    useEffect(() => {
        if (route.params && route.params.incorrectIndices) {
            const { incorrectIndices } = route.params;
            const filteredQuestions = data.filter((_, index) => incorrectIndices.includes(index));
            setIncorrectQuestions(filteredQuestions);
        }
    }, [route.params]);

    return (
        <Background>
            <View style={styles.incorrectQuestionScreen.container}>
                <IncorrectQuiz incorrectQuestions={incorrectQuestions} navigation={navigation} /> 
                
            </View>
        </Background>
    );
}

