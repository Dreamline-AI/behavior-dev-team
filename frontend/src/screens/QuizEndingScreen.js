import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import Button from '../components/Button';
import Background from '../components/Background';
import { Text } from 'react-native-paper';


export default function QuizEndingScreen({ route, navigation }) {

    const { userName } = route.params || {};
    return (
        <Background>
            
                <View style={styles.iconContainer}>
                    <Text style={styles.text}>Congrats on successfully completing this trivia!</Text>
                    <Image source={require('../assets/slay.png')} style={styles.image} />
                    <Text style={styles.score}>+250</Text>
                    
                </View>
                <Button
                    color="rgba(98, 218, 103, 1)"
                    mode="contained"
                    onPress={() => navigation.navigate('QuizStreakScreen', { userName: userName })}
                    labelStyle={{ color: 'white' , textTransform: 'none', fontSize: 16, }}
                    style={{ marginTop: 350}}
                    uppercase={false}
                >
                    Finish
                </Button>
           
        </Background>
    );
}

const styles = StyleSheet.create({
 
    iconContainer: {
        alignItems: 'center',
        
    },
    image: {
        width: 93.32,
        height: 93.32, 
        borderRadius: 46.66, 
        backgroundColor: 'rgba(217, 217, 217, 1)', 
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 80, 
        alignItems: 'center',
        textAlign: 'center',
    },
    score: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 22, 
    },
});
