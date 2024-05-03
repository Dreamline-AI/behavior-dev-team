import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from '../components/BackButton';

export default function IncentiveDetailPage({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
            <BackButton goBack={navigation.goBack} />
            <Text style={styles.heading}>Solar Panel Installation</Text>
        </View>
        <View style={styles.descriptionContainer}>
            <Text style={styles.title}>Sun-Powered Savings</Text>
          <Text style={styles.heading}>What We Offer:</Text>
          <Text style={styles.content}>
            <Text style={styles.boldText}>Free Solar Panel Installation:</Text> Harness the sun's power without upfront costs.{'\n'}
            <Text style={styles.boldText}>Reduce Energy Bills:</Text> Generate your own electricity and save every month.
          </Text>

          <Text style={styles.heading}>How It Works:</Text>
          <Text style={styles.content}>
            <Text style={styles.boldText}>Zero Hassle:</Text> We install, you save. It's that simple.{'\n'}
            <Text style={styles.boldText}>Sustainable Living:</Text> Decrease your carbon footprint and increase your home’s value.
          </Text>

          <Text style={styles.content}>
            <Text style={styles.boldText}>Apply Now:</Text> Light up your home with the sun and watch your energy bills plummet.
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
