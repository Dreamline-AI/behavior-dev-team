import React from 'react';
import { Avatar, Text } from 'react-native-paper';




export function UserPic({picSize}) {
  
  return (
    <>
   <Avatar.Image size={picSize} source={require('../assets/avatarIMG.jpg')} />
   <Text > </Text>
   </>
  )

}
