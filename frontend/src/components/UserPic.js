import React from 'react';
import { Avatar } from 'react-native-paper';
import { Text } from 'react-native-paper';



export function UserPic({name, picSize}) {
  
  return (
    <>
   <Avatar.Image size={picSize} source={require('../assets/avatarIMG.jpg')} />
   <Text > {name} </Text>
   </>
  )
}


