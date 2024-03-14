import React from 'react';
import { Avatar } from 'react-native-paper';
import { Text } from 'react-native-paper';



export function UserPic({name}) {
  return (
    <>
   <Avatar.Image size={32} source={require('../assets/avatarIMG.jpg')} />
   <Text> {name} </Text>
   </>
  )
}


