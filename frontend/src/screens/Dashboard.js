import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import { UserPic } from '../components/UserPic';
import BottomNavigationBar from './BottomNavigationBar';
import { useNavigation } from '@react-navigation/native';


export default function Dashboard({ route, navigation }) {
  const { userFirstName, userLastName } = route.params;
  const userName = `${userFirstName} ${userLastName}`; 

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
          <Text style={styles.streak}>15 </Text>
          <Image source={require('../assets/zap.png')} style={styles.icon} />
        </View>
        
        <View style={styles.dailyChallengeBox}>
          <View style={styles.greyBox}>
            <View style={styles.iconContainer1}>
            <Image source={require('../assets/dailychallenge.png')} style = {styles.headerImage}/>
            </View>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.textInfo}>
              <Text style={styles.challengeCategory}>Category 1</Text>
              <Text style={styles.numOfQuestions}>20 questions</Text>
            </View>
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
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  userDetails: {
    marginLeft: 10,
    maxWidth: 180, 
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userLevel: {
    fontSize: 11,
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
    padding: 0,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 20,
    alignSelf: 'stretch',
    maxWidth: 300,
  },
  sectionTitle1: {
    fontSize: 10,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  headerImage:{
    marginBottom:8,
    width: 100,
    height: 15,
    padding:2,
    marginRight: 2,
    alignItems: 'flex-start',
    marginTop: 4,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  iconContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    padding: 0,
    height:23,
    borderRadius: 6,
    marginBottom: 4,
    marginVertical: 0,
    alignSelf: 'flex-start',
  },

  textInfo: {
    flexDirection: 'column',
  },
  
  sectionTitle: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight:'bold',
  },
  greyBox: {
    backgroundColor: '#f5f5f5',
    padding: 0,
    borderRadius: 2,
    marginBottom: 2,
    alignItems: 'flex-start',
    height: 100,
  },
  challengeCategory: {
    marginTop:6,
    fontSize: 14,
    color: 'black',
  },
  numOfQuestions: {
    fontSize: 14,
    color: 'black',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 1
  },
  startButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  incompleteAction: {
    marginBottom: 20,
    alignSelf: 'stretch',
    maxWidth: 300,
  },
  blackBox: {
    borderWidth: 1,
    borderColor: '#ababab',
    borderRadius: 8,
    padding: 0,
    backgroundColor: 'transparent',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
    marginVertical: 0,
    paddingTop: 3,
    alignSelf: 'flex-start',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  almostGoneText: {
    color: '#000',
    fontSize: 11,
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
    marginLeft: 6,
  },
  claimButton: {
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 2,
    margin: 8,
    backgroundColor: 'transparent',
  },
  claimButtonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  availableIncentives: {
    marginBottom: 20,
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
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
    marginRight: 10,
  },
  incentiveImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  revision: {
    marginBottom: 15,
    alignSelf: 'stretch',
    maxWidth: 300,
  },
  revisionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: 'white',
    padding: 0,
    borderRadius: 1,
    // backgroundColor: 'white',
    alignItems: 'center',
  },
  revisionText: {
    fontSize: 11,
    color: '#666',
    textAlign: 'justify',
    flex: 1,
    marginRight: 10,
    marginTop: 6,
    marginBottom: 8,
  },
  roundButton: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 6,
    marginLeft:2,
    paddingTop: 3,
  },
  roundButtonText: {
    color: '#fff',
    fontSize: 11,
  },
});


