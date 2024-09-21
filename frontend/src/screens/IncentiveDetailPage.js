import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import BackButton from '../components/BackButton'
import Header from '../components/Header'
import Background from '../components/Background'
import LoadScreen from './LoadScreen'
import styles from '../commonStyles'

export default function IncentiveDetailPage({ route, navigation }) {
  const [incentive, setIncentive] = useState(null)
  const incentiveId = route.params.incentive

  useEffect(() => {
    // Fetch incentive details from backend
    fetch(`http://localhost:8080/api/incentives/${incentiveId}`)
      .then((response) => response.json())
      .then((data) => setIncentive(data))
      .catch((error) =>
        console.error('Error fetching incentive details:', error)
      )
  }, [incentiveId])

  if (!incentive) {
    return (
      <Background>
        <LoadScreen />
      </Background>
    )
  }

  return (
    // <SafeAreaView style={styles.incentiveDetailPage.safeArea}>
    //   <ScrollView style={styles.incentiveDetailPage.container}>
    //     <View style={styles.incentiveDetailPage.headerContainer}>
    //       <BackButton goBack={navigation.goBack} />
    //       <Text style={styles.incentiveDetailPage.heading}>{incentive.heading}</Text>
    //     </View>
    //     <View style={styles.incentiveDetailPage.descriptionContainer}>
    //       <Text style={styles.incentiveDetailPage.title}>{incentive.title}</Text>
    //       {incentive.content.map((section, index) => (
    //         <View key={index}>
    //           <Text style={styles.incentiveDetailPage.heading}>{section.subtitle}</Text>
    //           {section.description.map((desc, i) => (
    //             <Text key={i} style={styles.incentiveDetailPage.content}>
    //               {desc}
    //             </Text>
    //           ))}
    //         </View>
    //       ))}
    //       <Text style={styles.incentiveDetailPage.content}>{incentive.apply_content}</Text>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
    <Background>
      <ScrollView style={styles.incentiveDetailPage.container}>
        <View style={styles.incentiveDetailPage.headerContainer}>
          <BackButton
            style={styles.incentiveDetailPage.backButton}
            goBack={navigation.goBack}
          />
          <Header style={styles.incentiveDetailPage.headerTitle}>
            {incentive.heading}
          </Header>
        </View>
        <View style={styles.incentiveDetailPage.descriptionContainer}>
          <Text style={styles.incentiveDetailPage.title}>
            {incentive.title}
          </Text>

          {incentive.content.map((section, index) => (
            <View key={index}>
              <Text style={styles.incentiveDetailPage.heading}>
                {section.subtitle}:
              </Text>
              {section.description.map((desc, i) => (
                <Text style={styles.incentiveDetailPage.content}>{desc}</Text>
              ))}
            </View>
          ))}
          <Text style={styles.incentiveDetailPage.content}>
            <Text style={styles.incentiveDetailPage.boldText}>Apply Now:</Text>{' '}
            {incentive.apply_content}
          </Text>
        </View>
      </ScrollView>
    </Background>
  )
}
