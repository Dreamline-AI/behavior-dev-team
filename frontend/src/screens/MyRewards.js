import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Header from '../components/Header';

const rewards = [
  { date: '12/12/2024', description: 'Solar panel upgrade', id: 1 },
  { date: '19/03/2024', description: 'Solar panel upgrade', id: 2 }
];

export default function MyRewards({ navigation }) {
  return (
    <Background>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headerContainer}>
          <BackButton style={styles.backButton} goBack={navigation.goBack} />
          <Header style={styles.headerTitle}>My Rewards</Header>
        </View>
        <ScrollView style={styles.listFrame}>
          {rewards.map((reward) => (
            <View key={reward.id} style={styles.rewardItem}>
              <Text style={styles.dateText}>{reward.date}</Text>
              <Text style={styles.descriptionText}>{reward.description}</Text>
              <TouchableOpacity style={styles.updateButton} onPress={() => console.log('Update pressed')}>
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // alignSelf: 'center',
    // justifyContent: 'space-between',
    // textAlign: 'center',
    paddingTop: 10,
    width: '100%',
    backgroundColor: '#FFF',
    zIndex: 1,
  },
  backButton: {
    paddingLeft:'20px'
  },
  headerTitle: {
    // alignSelf: 'center',
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
  listFrame: {
    marginTop: 60,
  },
  rewardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
  },
  updateButton: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 3,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  updateButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
});
