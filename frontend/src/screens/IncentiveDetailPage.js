import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import Background from '../components/Background';
import LoadScreen from './LoadScreen';

export default function IncentiveDetailPage({ route, navigation }) {
  const [incentive, setIncentive] = useState(null);
  const incentiveId = route.params.incentive;

  useEffect(() => {
    // Fetch incentive details from backend
    fetch(`http://localhost:8080/api/incentives/${incentiveId}`)
      .then(response => response.json())
      .then(data => setIncentive(data))
      .catch(error => console.error('Error fetching incentive details:', error));
  }, [incentiveId]);

  if (!incentive) {
    return (
      <Background>
        <LoadScreen />
      </Background>
    );
  }

  return (
    // <SafeAreaView style={styles.safeArea}>
    //   <ScrollView style={styles.container}>
    //     <View style={styles.headerContainer}>
    //       <BackButton goBack={navigation.goBack} />
    //       <Text style={styles.heading}>{incentive.heading}</Text>
    //     </View>
    //     <View style={styles.descriptionContainer}>
    //       <Text style={styles.title}>{incentive.title}</Text>
    //       {incentive.content.map((section, index) => (
    //         <View key={index}>
    //           <Text style={styles.heading}>{section.subtitle}</Text>
    //           {section.description.map((desc, i) => (
    //             <Text key={i} style={styles.content}>
    //               {desc}
    //             </Text>
    //           ))}
    //         </View>
    //       ))}
    //       <Text style={styles.content}>{incentive.apply_content}</Text>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
    <Background>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer} >
          <BackButton style={styles.backButton} goBack={navigation.goBack} />
          <Header style={styles.headerTitle}>{incentive.heading}</Header>
        </View>
        <View style={styles.descriptionContainer}>
            <Text style={styles.title}>{incentive.title}</Text>

            {incentive.content.map((section, index) => (
              <View key={index}>
                <Text style={styles.heading}>{section.subtitle}:</Text>
                {section.description.map((desc, i) => (
                  <Text style={styles.content}>
                    {desc}
                  </Text>
                ))}
              </View>
            ))}
          <Text style={styles.content}>
            <Text style={styles.boldText}>Apply Now:</Text> {incentive.apply_content}
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white', 
  },
  container: {
    // paddingTop: 20, 
  },
  headerTitle:{
    // height: 10 + getStatusBarHeight(),
    color: '#000',
    fontFamily: 'Poppins',
    font: 'normal',
    fontWeight: 400,
    paddingTop:'8px',
    alignContent: 'center',
    alignSelf: 'center',
    // textAlign: 
    paddingLeft:'30px',
    fontSize: '18px',
  },
  backButton:{
      width: '24px',
      height: '24px',
      position: 'absolute',
      left: '16px',
      top: '7px'
  },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      zIndex: 1,
      paddingHorizontal: 16
  },
  title: {
    color: '#000',
    style: 'normal',
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 22,
    // marginBottom: 16, 
    // width: 187, 
  },
  descriptionContainer: {
    display: 'flex',
    width: '100%',
    padding: '8px 16px',
    paddingTop: '20px',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  heading: {
    fontFamily: 'SFProText-Regular',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0.01,
    color: '#000000', 
    marginBottom: 8, 
  },
  content: {
    fontFamily: 'SFProText-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0.01,
    color: '#000000', 
    marginBottom: 16, 
  },
//   boldText: {
//     fontWeight: '500', 
//   },
});
