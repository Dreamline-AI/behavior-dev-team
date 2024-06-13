import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from '../components/BackButton';

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
    return <Text>Loading...</Text>;
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
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container}>
    <View style={styles.headerContainer}>
          <BackButton goBack={navigation.goBack} />
          <Text style={styles.heading}>{incentive.heading}</Text>
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
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white', 
  },
  container: {
    padding: 16, 
  },
  headerContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'flex-start',
    width: '100%',
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    color: '#000000', 
    marginBottom: 16, 
    width: 187, 
  },
  descriptionContainer: {
    
  },
  heading: {
    fontFamily: 'SFProText',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0.01,
    color: '#000000', 
    marginBottom: 8, 
  },
  content: {
    fontFamily: 'SFProText',
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
