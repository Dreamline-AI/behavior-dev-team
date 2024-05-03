import React from 'react'
import Background from '../components/Background'
import { View, StyleSheet } from 'react-native'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import {UserPic} from '../components/UserPic'
import Feather from 'react-native-vector-icons/Feather'


export default function QuizStreakScreen({ route, navigation }) {
  const { userName } = route.params;

 
 
  return (
    <Background>
      <Logo />
       <View style={styles.userInfoContainer}> 
        <UserPic name={userName} />
      </View>
      <Header>You started a streak!</Header>

      <Feather name = 'zap'
      size={30}
      color={'rgba(255, 199, 0, 1)'}
     
      
      />
     
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
