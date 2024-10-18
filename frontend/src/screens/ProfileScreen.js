import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { UserPic } from '../components/UserPic'
import Paragraph from '../components/Paragraph'
import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import BottomNavigationBar from './BottomNavigationBar.js'
import Svg, { Path } from 'react-native-svg'
import styles from '../commonStyles.js'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/authActions.js'
import axios from 'axios'

export default function ProfileScreen({ route, navigation }) {
  let dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const userFirstName = useSelector((state) => state.auth.user.firstName)
  const userLastName = useSelector((state) => state.auth.user.lastName)
  const userName = `${userFirstName} ${userLastName}`

  const [voltCoins, setVoltCoins] = useState(null)

  useEffect(() => {
    const fetchVoltCoins = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/voltCoins/${user.userID}`
        )
        console.log(response.data)
        setVoltCoins(response.data)
      } catch (error) {
        console.error('Error fetching voltCoins:', error)
      }
    }

    fetchVoltCoins()
  }, [user.userID])

  const progress = 80
  const XPCurrent = 2500
  const XPNextLevel = 2950
  const currentStreak = 15
  const bestStreak = 32
  const claimedRewards = 15
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const highlightedDays = [0, 1, 3, 4]

  const ThunderIcon = ({ isActive, day }) => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 7,
        justifyContent: 'center',
      }}
    >
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
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
      </Svg>
      <Text
        style={{
          fontWeight: '700',
          fontSize: 19,
          color: theme.colors.greet,
          fontStyle: 'normal',
          lineHeight: 16,
          marginTop: 18,
        }}
      >
        {day}
      </Text>
    </View>
  )

  const EditClicked = () => {
    navigation.navigate('EditProfileScreen', { name: userName })
  }

  const handleLogout = () => {
    dispatch(logout())
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    })
  }

  return (
    <Background>
      <View style={styles.profileScreen.headerContainer}>
        <BackButton goBack={navigation.goBack} />
        <Text style={styles.profileScreen.header}>Your profile</Text>
        <TouchableOpacity
          style={styles.profileScreen.editButton}
          onPress={EditClicked}
        >
          <Text style={styles.profileScreen.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.profileScreen.container}>
        <View style={styles.profileScreen.profileHeader}>
          <View style={styles.profileScreen.profilePic}>
            <UserPic picSize={100} />
          </View>
          <View style={styles.profileScreen.userNameContainer}>
            <Text style={styles.profileScreen.userName}> {user.userName} </Text>
          </View>
        </View>
        <View style={styles.profileScreen.ProgressContainer}>
          <View style={styles.profileScreen.ProgressTitleContainer}>
            <Text style={styles.profileScreen.ProgressTitle}>Eco Novice</Text>
          </View>
          <View style={styles.profileScreen.progressBarContainer}>
            <View style={styles.profileScreen.progressBar}>
              <View
                style={[
                  styles.profileScreen.progress,
                  { width: `${progress}%` },
                ]}
              ></View>
            </View>
          </View>
          <View style={styles.profileScreen.ProgressTag}>
            <View style={styles.profileScreen.xpTestContainer}>
              <Text style={styles.profileScreen.xpTest}> {XPCurrent}XP </Text>
            </View>
            <View style={styles.profileScreen.xpRemainingContainer}>
              <Text style={styles.profileScreen.xpRemaining}>
                {XPNextLevel - XPCurrent}XP away from a level-up
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.profileScreen.statsContainer}>
          <View style={styles.profileScreen.box}>
            <View style={styles.profileScreen.weekContainer}>
              <View style={styles.profileScreen.daysContainer}>
                <View style={styles.profileScreen.days}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    {days.map((day, index) => (
                      <ThunderIcon
                        key={index}
                        isActive={highlightedDays.includes(index)}
                        day={day.charAt(0)}
                      />
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
            <View style={styles.profileScreen.statContainer}>
              <View style={styles.profileScreen.statBox}>
                <Text style={styles.profileScreen.statText}>Current</Text>
                <View style={styles.profileScreen.statRow}>
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
                  <Text style={styles.profileScreen.statNumber}>
                    {currentStreak}
                  </Text>
                </View>
              </View>
              <View style={styles.profileScreen.statBox}>
                <Text style={styles.profileScreen.statText}>Best streak</Text>
                <View style={styles.profileScreen.statRow}>
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
                  <Text style={styles.profileScreen.statNumber}>
                    {bestStreak}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.profileScreen.statContainer}>
              <View style={styles.profileScreen.statBox}>
                <Text style={styles.profileScreen.statText}>Voltcoins</Text>
                <View style={styles.profileScreen.statRow}>
                  <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
                    <Path
                      d="M13.5 2L3.5 14H12.5L11.5 22L21.5 10H12.5L13.5 2Z"
                      fill="#48FF00"
                      stroke="#48FF00"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                  <Text style={styles.profileScreen.statNumber}>
                    {voltCoins}
                  </Text>
                </View>
              </View>
              <View style={styles.profileScreen.statBox}>
                <Text style={styles.profileScreen.statText}>
                  Claimed Rewards
                </Text>
                <View style={styles.profileScreen.statRow}>
                  <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
                    <Path
                      d="M13.5 2L3.5 14H12.5L11.5 22L21.5 10H12.5L13.5 2Z"
                      fill="#FFA800"
                      stroke="#FFA800"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                  <Text style={styles.profileScreen.statNumber}>
                    {claimedRewards}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.profileScreen.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleLogout}
            style={styles.profileScreen.logoutButton}
          >
            Logout
          </Button>
        </View>
      </ScrollView>
      <BottomNavigationBar navigation={navigation} route={route} />
    </Background>
  )
}
