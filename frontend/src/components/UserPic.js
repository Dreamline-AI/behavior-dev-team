import React from 'react';
import { Avatar, Text } from 'react-native-paper';

export function UserPic({ name = 'User' }) {
  return (
    <>
      <Avatar.Image size={32} source={require('../assets/avatarIMG.jpg')} />
      <Text> {name} </Text>
    </>
  );
}
