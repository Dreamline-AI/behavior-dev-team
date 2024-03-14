import React from 'react'
import Background from '../components/Background'
import { View, StyleSheet } from 'react-native'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Text } from 'react-native-paper'
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
    flexDirection: 'row',  // Arrange UserPic and userName horizontally
    alignItems: 'center',  // Center items vertically
    marginBottom: 16,  // Adjust margin as needed
  },
};
