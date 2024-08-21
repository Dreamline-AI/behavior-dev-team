import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import {UserPic} from '../components/UserPic'
import Paragraph from '../components/Paragraph'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import BottomNavigationBar from './BottomNavigationBar.js';
import Svg, { Path } from 'react-native-svg';

export default function ProfileScreen ({ route, navigation }){
  const { userName, userFirstName, userLastName } = route.params;
  const progress = 80;
  const XPCurrent = 2500;
  const XPNextLevel = 2950;
  const currentStreak = 15;
  const bestStreak = 32;
  const voltcoins = 15;
  const claimedRewards = 15;
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const highlightedDays = [0, 1, 3, 4]; 

  const ThunderIcon = ({ isActive, day }) => (
    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingHorizontal: 7, justifyContent: 'center' }}>
      <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill='none'
          width="25px"
          height="24px"
        >
        <Path
          d="M13.5 2L3.5 14H12.5L11.5 22L21.5 10H12.5L13.5 2Z"
          fill={isActive ? '#FFC700' : '#D9D9D9'}
          stroke={isActive ? '#FFC700' : '#D9D9D9'}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Text style={{ fontWeight: 700, fontSize: 19, color: theme.colors.greet, fontStyle: 'normal', lineHeight: 16, marginTop: 18}}>{day}</Text>
    </View>
  );
  
  const isActive = true;
  const EditClicked = () => {
    navigation.navigate('EditProfileScreen', {name: userName})
  } 
  
  return (
    <Background>
      <View style={styles.headerContainer}>
        <BackButton goBack={navigation.goBack} />
        <Header style={styles.header}>Your profile</Header>
        <TouchableOpacity style={styles.editButton} onPress={EditClicked}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.profilePic}> 
            <UserPic picSize={100} />
          </View>
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}> {userName} </Text>
          </View>
        </View>
        <View style={styles.ProgressContainer}>
          <View style={styles.ProgressTitleContainer}>
            <Text style={styles.ProgressTitle}>Eco Novice</Text> 
          </View>
          <View style={styles.progressBarContainer}> 
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${progress}%` }]}></View>
            </View>
          </View>
          <View style={styles.ProgressTag}>
            <View style={styles.xpTestContainer}>
              <Text style={styles.xpTest}> {XPCurrent}XP </Text>
            </View>
            <View style={styles.xpRemainingContainer}>
              <Text style={styles.xpRemaining}> {XPNextLevel - XPCurrent}XP away from a level-up </Text> 
            </View> 
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.box}>
            <View style={styles.weekContainer}>
              <View style={styles.daysContainer}>
                <View style={styles.days}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    {days.map((day, index) => (
                      <ThunderIcon key={index} isActive={highlightedDays.includes(index)} day={day.charAt(0)} />
                    ))}
                  </View>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    left: 23,
                    top: 94,
                    width: 240,
                    height: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.10)',
                  }}
              />
              </View>
            </View>
            <View style={styles.statContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statText}>Current</Text>
                <View style={styles.statRow}>
                  <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
                    <Path
                      d="M13.5 2L3.5 14H12.5L11.5 22L21.5 10H12.5L13.5 2Z"
                      fill="#FFC700"
                      stroke="#FFC700"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                  <Text style={styles.statNumber}>{currentStreak}</Text>
                </View>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statText}>Best streak</Text>
                <View style={styles.statRow}>
                <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
                    <Path
                      d="M13.5 2L3.5 14H12.5L11.5 22L21.5 10H12.5L13.5 2Z"
                      fill="#FF480F"
                      stroke="#FF480F"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                  <Text style={styles.statNumber}>{bestStreak}</Text>
                </View>
              </View>
            </View>
            <View style={styles.statContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statText}>Voltcoins</Text>
                <View style={styles.statRow}>
                  <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
                    <Path
                      d="M18.9481 5.35219C17.8512 3.46875 16.3606 2.4375 14.75 2.4375H10.25C8.63937 2.4375 7.14875 3.46875 6.05188 5.35219C5.01125 7.13719 4.4375 9.49781 4.4375 12C4.4375 14.5022 5.01125 16.8628 6.05188 18.6478C7.14875 20.5312 8.63937 21.5625 10.25 21.5625H14.75C16.3606 21.5625 17.8512 20.5312 18.9481 18.6478C19.9887 16.8666 20.5625 14.5022 20.5625 12C20.5625 9.49781 19.9887 7.13719 18.9481 5.35219ZM19.4263 11.4375H16.0513C15.9903 9.67125 15.6416 7.99406 15.0444 6.5625H18.3125C18.9744 7.94438 19.3588 9.63469 19.4263 11.4375ZM14.75 3.5625C15.8103 3.5625 16.8331 4.22438 17.6694 5.4375H14.495L14.4481 5.35219C14.069 4.68288 13.585 4.07866 13.0147 3.5625H14.75ZM7.02313 18.0806C6.08188 16.4653 5.5625 14.3062 5.5625 12C5.5625 9.69375 6.08188 7.53469 7.02313 5.91937C7.90625 4.39969 9.05562 3.5625 10.25 3.5625C11.4444 3.5625 12.5938 4.39969 13.4769 5.91937C14.4181 7.53469 14.9375 9.69375 14.9375 12C14.9375 14.3062 14.4181 16.4653 13.4769 18.0806C12.5938 19.6003 11.4444 20.4375 10.25 20.4375C9.05562 20.4375 7.90625 19.6003 7.02313 18.0806ZM14.75 20.4375H13.0147C13.585 19.9213 14.069 19.3171 14.4481 18.6478L14.495 18.5625H17.6694C16.8331 19.7756 15.8103 20.4375 14.75 20.4375ZM18.3125 17.4375H15.0444C15.6416 16.0059 15.9903 14.3287 16.0513 12.5625H19.4263C19.3588 14.3653 18.9744 16.0556 18.3125 17.4375Z"
                      fill="black"
                    />
                  </Svg>
                  <Text style={styles.statNumber}>{voltcoins}</Text>
                </View>
              </View>
              <View style={styles.statBox}>
                <TouchableOpacity>
                  <Text style={styles.statText}>Claimed rewards</Text>
                  <View style={styles.statRow}>
                    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
                      <Path
                        d="M12.5 15C16.366 15 19.5 11.866 19.5 8C19.5 4.13401 16.366 1 12.5 1C8.63401 1 5.5 4.13401 5.5 8C5.5 11.866 8.63401 15 12.5 15Z"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <Path
                        d="M8.71 13.8899L7.5 22.9999L12.5 19.9999L17.5 22.9999L16.29 13.8799"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                    <Text style={styles.statNumber}>{claimedRewards}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>See my impact</Text>
            </TouchableOpacity>
          </View>
        </View> 
      </ScrollView>
      <BottomNavigationBar userName={userName} userFirstName={userFirstName} userLastName={userLastName} />
    </Background>
    
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    width: '100%',
    padding: '8px',
    justifyContents: 'center',
    alignItems: 'center',
    gap: '8px',
  },
  header: {
    color: theme.colors.greet,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontweight: 510,
    lineheight: 22, 
  },
  editButton: {
    paddingVertical: 3,    
    paddingHorizontal: 8,    
    justifyContent: 'center', 
    gap: '2px',                 
    position: 'absolute',     
    right: 16.5,              
    bottom: 7.625,            
    borderRadius: 14,         
    borderWidth: 1,           
    borderColor: '#000',      
    borderStyle: 'solid' 
  },
  editButtonText: {
    color: theme.colors.greet,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 16, 
  },
  container: {
    width: '100%',
    marginTop: 50,
  },
  profileHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '18px',
  },
  profilePic: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
  },
  userName: {
    color: theme.colors.greet,
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 'normal',
  },
  ProgressContainer: {
    width: '100%',
    paddingHorizontal: 32,
    paddingVertical: 8,
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  ProgressTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
  },
  ProgressTitle: {
    fontSize: 14,
    color: theme.colors.greet,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 16,
  },
  
  progressBarContainer: {
    alignItems: 'center',
    width: '100%',
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: '#D9D9D9', 
  },
  progress: {
    height: '100%',
    backgroundColor: '#13D402',
    borderRadius: 50,
  },
  ProgressTag: {
    flexDirection: 'row',
    width: '100%',
  },
  xpTestContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  xpTest:{
    fontSize: 12,
    color: '#0A8300',
  },
  xpRemainingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  xpRemaining:{
    fontSize: 12,
    color: '#B2BEB5',
  },
  statsContainer: {
    alignItems: 'center',
    
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 23,
  },
  box: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',

  },
  weekContainer: {
    width: '100%',
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 6,
  },
  daysContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  days: {
    padding: 8,
    marginBottom: 10
  },
  icon: {
    width: 24,
    height: 24,
  },
  statContainer: {
    width: 300,
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingBottom: 8,
    flexDirection: 'row', 
    alignItems: 'center',
  },

  statBox: { 
    display: 'flex',
    height: 74,
    paddingVertical: 8,
    paddingHorizontal: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    flex: 1,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.10)',
  },
  statRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '4px',
  },
  statNumber: {
    width: 23,
    height: 28,
    color: '#000',
    fontFamily: theme.colors.greet,
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 28, 
    textOverflow: 'ellipsis', 
    overflow: 'hidden',
  },
  statText: {
    color: '#2E2D2D',
    fontFamily: theme.colors.greet,
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: 16,
  },
  button: {
    display: 'flex',
    height: 74,
    paddingVertical: 8,
    paddingHorizontal: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.10)',
    marginVertical: 16,
    width: 250,

  },

  buttonText: {
    color: '#2E2D2D',
    fontFamily: theme.colors.greet,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16,
  },
});

