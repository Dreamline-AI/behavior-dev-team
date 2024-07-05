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

export default function ProfileScreen ({ route, navigation }){
  const { userName } = route.params;
  const progress = 80;
  const XPCurrent = 2500;
  const XPNextLevel = 2950;
  const currentStreak = 15;
  const bestStreak = 32;
  const voltcoins = 15;
  const claimedRewards = 15;
  const userdata = [
    "Sunday",
    "Monday",
    "Thursday"
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let attendance = days.map(t=> userdata.includes(t))
  const ThunderIcon = ({ isActive, day }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 13 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isActive ? '#FFC700' : '#D9D9D9'}
          width="24px"
          height="24px"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M13 3L4 14h7v7l9-11h-7z" />
        </svg>
        <span style={{fontWeight: 'bold', fontSize: 19, color: theme.colors.greet, fontFamily: 'Poppins' }}>{day}</span>
      </div>
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
      <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
          <UserPic picSize={64} />
          <View>
            <Text style={styles.userName}> {userName} </Text>
          </View>
        </View>
        <View style={styles.ProgressContainer}>
          <Text style={styles.ProgressTitle}>Eco Novice</Text> 
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${progress}%` }]}></View>
            </View>
            <View style={styles.ProgressTag}>
            <Text style={styles.xpTest}> {XPCurrent}XP </Text>
            <Text style={styles.xpRemaining}> {XPNextLevel - XPCurrent}XP away from a level-up </Text>  
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.box}>
            <View style={styles.days}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 12 }}>
                {
                  days.map( (day, index) =>
                  <ThunderIcon isActive={attendance[index]} day ={day.charAt(0)} />
                )}
              </div>
            </View>
            <View
              style={{
                borderBottomColor: '#ddd',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statText}>Current</Text>
                <View style={styles.statRow}>
                  <Ionicons name="flash" size={24} color="#FFC700" />
                  <Text style={styles.statNumber}>{currentStreak}</Text>
                </View>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statText}>Best streak</Text>
                <View style={styles.statRow}>
                  <Ionicons name="flash" size={24} color="red" />
                  <Text style={styles.statNumber}>{bestStreak}</Text>
                </View>
              </View>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statText}>Voltcoins</Text>
                <View style={styles.statRow}>
                  <FontAwesome5 name="coins" size={24} color="silver" />
                  <Text style={styles.statNumber}>{voltcoins}</Text>
                </View>
              </View>
              <View style={styles.statBox}>
                <TouchableOpacity>
                  <Text style={styles.statText}>Claimed rewards</Text>
                  <View style={styles.statRow}>
                    <Feather name="award" size={24} color="silver" />
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
        <BottomNavigationBar userName={userName}/>  
      </ScrollView>
      
      
    </Background>
    
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
    paddingTop: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,  
  },
  header: {
    textAlign: 'center',
    flex: 1,
  },
  editButton: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  editButtonText: {
    color: theme.colors.greet,
    fontSize: 12,
  },
  container: {
    width: '100%',
    marginTop: 50
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,  
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.greet,
  },
  ProgressContainer: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 0,
  },
  ProgressTitle: {
    padding: 10,
    fontSize: 14,
    color: theme.colors.greet,
  },
  progressBar: {
    height: 10,
    width: '90%',
    backgroundColor: '#e0e0e0',
    borderRadius: 50,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#13D402',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black'
  },
  ProgressTag: {
    paddingTop: 3,
    flexDirection: 'row',
    width: '90%',
  },
  xpTest:{
    fontSize: 12,
    color: '#0A8300',
  },
  xpRemaining:{
    fontSize: 12,
    color: '#B2BEB5',
  },
  statsContainer: {
    alignItems: 'center',
  },
  box: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    paddingHorizontal: 24,
    paddingVertical: 18,
    marginBottom: 24,
  },
  days: {
    padding: 8,
    marginBottom: 10
  },
  icon: {
    width: 24,
    height: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20
  },
  statBox: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',  
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statText: {
    fontSize: 10,
    color: '#666',
  },
  button: {
    backgroundColor: '#F2F2F2',
    paddingVertical: 8,
    //paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    fontSize: 16,
    color: theme.colors.greet,
    paddingHorizontal: 4
  },
});
