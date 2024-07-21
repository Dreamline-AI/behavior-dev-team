import React from 'react';
import Background from '../components/Background';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { UserPic } from '../components/UserPic';
import BottomNavigationBar from './BottomNavigationBar';
import { useNavigation } from '@react-navigation/native';


export default function Dashboard({ route, navigation }) {
  const { userFirstName, userLastName } = route.params;
  const userName = `${userFirstName} ${userLastName}`;
  // const navigation = useNavigation();

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <Logo />
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <UserPic style={styles.userPic} />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userLevel}>Eco Novice</Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarFill} />
              </View>
            </View>
  
          </View>
          <Text style={styles.streak}>15 ⚡</Text>
        </View>
        
        <View style={styles.dailyChallengeBox}>
          <Text style={styles.sectionTitle}>Daily Challenge</Text>
          <View style={styles.greyBox}>
            <Text style={styles.challengeCategory}>Category 1</Text>
            <Text style={styles.numOfQuestions}>20 questions</Text>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Start!</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.incompleteAction}>
          <Text style={styles.sectionTitle}>Incomplete actions</Text>
          <View style={styles.blackBox}>
            <View style={styles.iconContainer}>
              <Image source={require('../assets/clock.png')} style={styles.icon} />
              <Text style={styles.almostGoneText}>Almost gone</Text>
            </View>
            <View style={styles.bottomContainer}>
              <Text style={styles.unplugText}>Unplug for a day</Text>
              <TouchableOpacity 
                style={styles.claimButton} 
                onPress={() => navigation.navigate('TakeActionScreen')}
              >
                <Text style={styles.claimButtonText}>Claim 500 coins</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.availableIncentives}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available incentives</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all &gt;</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.incentivesContainer}>
            <TouchableOpacity style={styles.incentiveCard}>
              <Image source={require('../assets/incentive1.png')} style={styles.incentiveImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.incentiveCard}>
              <Image source={require('../assets/incentive2.png')} style={styles.incentiveImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.incentiveCard}>
              <Image source={require('../assets/incentive3.png')} style={styles.incentiveImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.incentiveCard}>
              <Image source={require('../assets/incentive4.png')} style={styles.incentiveImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.incentiveCard}>
              <Image source={require('../assets/incentive5.png')} style={styles.incentiveImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.incentiveCard}>
              <Image source={require('../assets/incentive6.png')} style={styles.incentiveImage} />
            </TouchableOpacity>
          </ScrollView>
        </View>
        
        <View style={styles.revision}>
          <Text style={styles.sectionTitle}>Revisions</Text>
          <View style={styles.revisionContainer}>
            <Text style={styles.revisionText}>
              Go back to the challenging questions. Revision helps with memory retention!
            </Text>
            <TouchableOpacity style={styles.roundButton}>
              <Text style={styles.roundButtonText}>Get Smarter &gt;</Text>
            </TouchableOpacity>
          </View>
        </View>
        <BottomNavigationBar userName={userName} />
      </ScrollView>
      
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding:1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    maxWidth: 300,

  },
  userPic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userDetails: {
    marginLeft: 10,
    maxWidth: 180, // Adjust this value based on your design needs
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userLevel: {
    fontSize: 14,
    color: '#666',
  },
  progressBarContainer: {
    width: 100,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    marginTop: 3,
  },
  progressBarFill: {
    width: '50%',
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 2,
  },
  streak: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dailyChallengeBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 10,
    alignSelf: 'stretch',
    maxWidth: 300,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  greyBox: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  challengeCategory: {
    fontSize: 14,
    color: '#666',
  },
  numOfQuestions: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  startButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  incompleteAction: {
    marginBottom: 10,
    alignSelf: 'stretch',
    maxWidth: 300,
  },
  blackBox: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'transparent',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  almostGoneText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unplugText: {
    color: '#000',
    fontSize: 14,
  },
  claimButton: {
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  claimButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  availableIncentives: {
    marginBottom: 10,
    alignSelf: 'stretch',
    maxWidth: 300,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAll: {
    color: '#000',
    fontSize: 14,
  },
  incentivesContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
  incentiveCard: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 8,
    marginRight: 10,
  },
  incentiveImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  revision: {
    marginBottom: 10,
    alignSelf: 'stretch',
    maxWidth: 300,
  },
  revisionContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  revisionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  roundButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  roundButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});


