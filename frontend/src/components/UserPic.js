import React from 'react';
import { Avatar, Text } from 'react-native-paper';




export function UserPic({name = 'User' , picSize}) {
  
  return (
    <>
   <Avatar.Image size={picSize} source={require('../assets/avatarIMG.jpg')} />
   <Text > {name} </Text>
   </>
  )

}
