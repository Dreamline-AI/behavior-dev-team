import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import Background from '../components/Background';
import { Text } from 'react-native-paper';
import * as Progress from 'react-native-progress';


export default function RedoQuestionsScreen({ navigation, route }) {

    const { incorrectIndices, progress } = route.params;

    const handleContinue = () => {

        navigation.navigate('IncorrectQuestionScreen', { redoIncorrect: true, incorrectIndices: incorrectIndices });
    };

    return (
        <Background>
            <View style={styles.container}>

            <View style={styles.progressBarContainer}>
                <Progress.Bar progress={progress} width={350} color='black' unfilledColor='rgba(217, 217, 217, 1)' borderWidth={0} height={8} />
            </View>
                <Text style={styles.text}>
                    Now let's revisit the questions that you didn't get right on the first go.
                </Text>

                <Button
                    color="black"
                    mode="contained"
                    onPress={handleContinue}
                >
                    Continue
                </Button>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 300,
        textAlign: 'left',
        marginTop: -260,
    },

    progressBarContainer: {
        width: '100%',
        height: 20,
        marginBottom: 300,
    },
});