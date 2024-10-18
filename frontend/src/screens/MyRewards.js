import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Header from '../components/Header';
import styles from "../commonStyles"

const rewards = [
  { date: '12/12/2024', description: 'Solar panel upgrade', id: 1 },
  { date: '19/03/2024', description: 'Solar panel upgrade', id: 2 }
];

export default function MyRewards({ navigation }) {
  return (
    <Background>
      <SafeAreaView style={styles.myRewards.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.myRewards.headerContainer}>
          <BackButton style={styles.myRewards.backButton} goBack={navigation.goBack} />
          <Header style={styles.myRewards.headerTitle}>My Rewards</Header>
        </View>
        <ScrollView style={styles.myRewards.listFrame}>
          {rewards.map((reward) => (
            <View key={reward.id} style={styles.myRewards.rewardItem}>
              <Text style={styles.myRewards.dateText}>{reward.date}</Text>
              <Text style={styles.myRewards.descriptionText}>{reward.description}</Text>
              <TouchableOpacity style={styles.myRewards.updateButton} onPress={() => console.log('Update pressed')}>
                <Text style={styles.myRewards.updateButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}


