import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Background from '../components/Background'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import styles from '../commonStyles'

import ACUpgradeIcon from '../assets/incentives/wind.svg'
import SolarPanelIcon from '../assets/incentives/sun.svg'
import BillDiscountIcon from '../assets/incentives/dollar-sign.svg'
import WaterConservationIcon from '../assets/incentives/droplet.svg'
import EVSubsidiesIcon from '../assets/incentives/truck.svg'
import UnlockGrantIcon from '../assets/incentives/lock.svg'

export default function IncentivesList({ navigation }) {
  const [incentives, setIncentives] = useState([])

  useEffect(() => {
    // Fetch incentives list from backend
    fetch('http://localhost:8080/api/incentives')
      .then((response) => response.json())
      .then((data) => setIncentives(data))
      .catch((error) => console.error('Error fetching incentives:', error))
  }, [])

  const goToDetail = (incentive) => {
    navigation.navigate('IncentiveDetailPage', { incentive })
  }

  const getImagePath = (type) => {
    switch (type) {
      case 'ACUpgradeIcon':
        return ACUpgradeIcon
      case 'SolarPanelIcon':
        return SolarPanelIcon
      case 'BillDiscountIcon':
        return BillDiscountIcon
      case 'WaterConservationIcon':
        return WaterConservationIcon
      case 'EVSubsidiesIcon':
        return EVSubsidiesIcon
      case 'UnlockGrantIcon':
        return UnlockGrantIcon
      default:
        return null // or some default icon
    }
  }

  return (
    <Background>
      {/* <SafeAreaView style={styles.incentivesList.safeArea}> */}
      <View style={styles.incentivesList.headerContainer}>
        <BackButton
          style={styles.incentivesList.backButton}
          onPress={() => navigation.navigate('Dashboard')}
        />
        <Header style={styles.incentivesList.headerTitle}>
          All incentives
        </Header>
      </View>
      <ScrollView style={styles.incentivesList.listFrame}>
        {incentives.map((incentive, index) => (
          <TouchableOpacity
            key={index}
            style={styles.incentivesList.card}
            onPress={() => goToDetail(incentive.id)}
          >
            <View style={styles.incentivesList.imageContainer}>
              <Image
                style={styles.incentivesList.image}
                source={getImagePath(incentive.image)}
              />
            </View>
            <View style={styles.incentivesList.textContainer}>
              <Text style={styles.incentivesList.title}>
                {incentive.heading}
              </Text>
              <Text style={styles.incentivesList.subtitle}>
                {incentive.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* </SafeAreaView> */}
      {/* </View> */}
    </Background>
  )
}
