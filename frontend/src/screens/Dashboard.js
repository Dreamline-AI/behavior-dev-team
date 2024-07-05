import React from 'react';
import Background from '../components/Background';
import { View, StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { UserPic } from '../components/UserPic';

export default function Dashboard({ route, navigation }) {
  const { userFirstName = '', userLastName = '' } = route.params || {};
  const userName = `${userFirstName} ${userLastName}`.trim();

  return (
    <Background>
      <Logo />
      <View style={styles.userInfoContainer}>
        <UserPic name={userName} />
      </View>
      <Header>Dashboard</Header>
     
      <Paragraph>Please have fun</Paragraph>
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
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});
