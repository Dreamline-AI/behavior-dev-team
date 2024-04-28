import React from 'react'
import Background from '../components/Background'
import { View, StyleSheet } from 'react-native'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import {UserPic} from '../components/UserPic'


export default function Dashboard({ route, navigation }) {
  const { userName } = route.params;

 
 
  return (
    <Background>
      <Logo />
       <View style={styles.userInfoContainer}> 
        <UserPic name={userName} />
        
      </View>
      <Header>Dashboard</Header>
      <Button color= "#00000066"
        mode="outlined"
        onPress={() => navigation.navigate('QuizScreen')}
      >
        Login with Facebook
      </Button>
      <Paragraph>
        Please have fun
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Logout
      </Button>
    </Background>
  )
}
const styles = {
  userName: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'left',
  },
  userInfoContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16,  
  },
};
