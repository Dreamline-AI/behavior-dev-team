import React from 'react';
import Background from '../components/Background';
import { View, StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { Text } from 'react-native-paper';
import { UserPic } from '../components/UserPic';
import { authentication } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthProvider';

export default function Dashboard({ route, navigation }) {
  const { userName } = route.params || { userName: 'Guest' }; // Provide a default value
  const { loggedInUser, setLoggedInUser } = useAuth();

  const signOutUser = () => {
    signOut(authentication)
      .then(() => {
        setLoggedInUser(null);
        navigation.reset({
          index: 0,
          routes: [{ name: 'StartScreen' }],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Background>
      <Logo />
      <View style={styles.userInfoContainer}>
        <UserPic name={userName} />
      </View>
      <Header>Welcome, {userName}</Header>
      <Paragraph>
        Please have fun
      </Paragraph>
      <Button
        mode="outlined"
        onPress={signOutUser}
      >
        Logout
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',  // Arrange UserPic and userName horizontally
    alignItems: 'center',  // Center items vertically
    marginBottom: 16,  // Adjust margin as needed
  },
  userName: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'left',
  },
});