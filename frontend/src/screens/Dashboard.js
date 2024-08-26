import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import { UserPic } from '../components/UserPic';
import BottomNavigationBar from './BottomNavigationBar';
import { useNavigation } from '@react-navigation/native';
import styles from "../commonStyles"


export default function Dashboard({ route, navigation }) {
  const { userFirstName, userLastName } = route.params || {};
  // console.log('userFirstName:', userFirstName);
  // console.log('userLastName:', userLastName);
  const userName = `${userFirstName} ${userLastName}`; 

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.dashboard.container}>
        <Logo />
        <View style={styles.dashboard.header}>
          <View style={styles.dashboard.userInfo}>
            <UserPic style={styles.dashboard.userPic} />
            <View style={styles.dashboard.userDetails}>
              <Text style={styles.dashboard.userName}>{userName}</Text>
              <Text style={styles.dashboard.userLevel}>Eco Novice</Text>
              <View style={styles.dashboard.progressBarContainer}>
                <View style={styles.dashboard.progressBarFill} />
              </View>
            </View>
  
          </View>
          <Text style={styles.dashboard.streak}>15 </Text>
          <Image source={require('../assets/zap.png')} style={styles.dashboard.icon} />
        </View>
        <View style={styles.dashboard.dashboardContainer}>
          <View style={styles.dashboard.dailyChallengeBox}>
            <View style={styles.dashboard.greyBox}>
              <View style={styles.dashboard.iconContainer1}>
              <Image source={require('../assets/dailychallenge.png')} style = {styles.dashboard.headerImage}/>
              </View>
            </View>
            <View style={styles.dashboard.textContainer}>
              <View style={styles.dashboard.textInfo}>
                <Text style={styles.dashboard.challengeCategory}>Category 1</Text>
                <Text style={styles.dashboard.numOfQuestions}>20 questions</Text>
              </View>
              <TouchableOpacity style={styles.dashboard.startButton}>
                <Text style={styles.dashboard.startButtonText}>Start!</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.dashboard.incompleteAction}>
            <Text style={styles.dashboard.sectionTitle}>Incomplete actions</Text>
            <View style={styles.dashboard.blackBox}>
              <View style={styles.dashboard.iconContainer}>
                <Image source={require('../assets/clock.png')} style={styles.dashboard.icon} />
                <Text style={styles.dashboard.almostGoneText}>Almost gone</Text>
              </View>
              <View style={styles.dashboard.bottomContainer}>
                <Text style={styles.dashboard.unplugText}>Unplug for a day</Text>
                <TouchableOpacity 
                  style={styles.dashboard.claimButton} 
                  onPress={() => navigation.navigate('TakeActionScreen',{userName, userFirstName, userLastName})}
                >
                  <Text style={styles.dashboard.claimButtonText}>Claim 500 coins</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <View style={styles.dashboard.availableIncentives}>
            <View style={styles.dashboard.sectionHeader}>
              <Text style={styles.dashboard.sectionTitle}>Available incentives</Text>
              <TouchableOpacity>
                <Text style={styles.dashboard.seeAll}>See all &gt;</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dashboard.incentivesContainer}>
              <TouchableOpacity style={styles.dashboard.incentiveCard}>
                <Image source={require('../assets/incentive1.png')} style={styles.dashboard.incentiveImage} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.dashboard.incentiveCard}>
                <Image source={require('../assets/incentive2.png')} style={styles.dashboard.incentiveImage} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.dashboard.incentiveCard}>
                <Image source={require('../assets/incentive3.png')} style={styles.dashboard.incentiveImage} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.dashboard.incentiveCard}>
                <Image source={require('../assets/incentive4.png')} style={styles.dashboard.incentiveImage} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.dashboard.incentiveCard}>
                <Image source={require('../assets/incentive5.png')} style={styles.dashboard.incentiveImage} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.dashboard.incentiveCard}>
                <Image source={require('../assets/incentive6.png')} style={styles.dashboard.incentiveImage} />
              </TouchableOpacity>
            </ScrollView>
          </View>
          
          <View style={styles.dashboard.revision}>
            <Text style={styles.dashboard.sectionTitle}>Revisions</Text>
            <View style={styles.dashboard.revisionContainer}>
              <Text style={styles.dashboard.revisionText}>
                Go back to the challenging questions. Revision helps with memory retention!
              </Text>
              <TouchableOpacity style={styles.dashboard.roundButton}>
                <Text style={styles.dashboard.roundButtonText}>Get Smarter &gt;</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <BottomNavigationBar userName={userName} userFirstName={userFirstName} userLastName={userLastName} />
      </ScrollView>
    </Background>
  );
}




