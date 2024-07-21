import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BottomNavigationBar({userName}) {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Home');

  const changeTab = (tabName) => {
    setActiveTab(tabName);
    switch (tabName) {
      case 'Home':
        navigation.navigate('Dashboard');
        break;
      case 'Profile':
        navigation.navigate('ProfileScreen', { userName});
        break;
      case 'Rewards':
        navigation.navigate('RewardScreen'); // create the screen later
        break;
      case 'Shop':
        navigation.navigate('IncentivesList'); // create the screen later
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TabButton iconSource={require('../assets/home.png')} label="Home" tabName="Home" onPress={changeTab} activeTab={activeTab} />
        <TabButton iconSource={require('../assets/Profile.png')} label="Profile" tabName="Profile" onPress={changeTab} activeTab={activeTab} />
        <TabButton iconSource={require('../assets/Rewards.png')} label="Rewards" tabName="Rewards" onPress={changeTab} activeTab={activeTab} />
        <TabButton iconSource={require('../assets/Shop.png')} label="Shop" tabName="Shop" onPress={changeTab} activeTab={activeTab} />
      </View>
      {/* Green circle indicator */}
      <View style={[styles.indicatorContainer, { left: `${25 * ['Home', 'Profile', 'Rewards', 'Shop'].indexOf(activeTab)}%` }]}>
        <View style={styles.indicator} />
      </View>
    </View>
  );
}

const TabButton = ({ iconSource, label, tabName, onPress, activeTab }) => (
  <TouchableOpacity
    style={[styles.tabButton, activeTab === tabName && styles.activeTab]}
    onPress={() => onPress(tabName)}
  >
    <Image source={iconSource} style={styles.icon} />
    <Text style={{ color: activeTab === tabName ? 'black' : 'grey', marginTop: 5 }}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    paddingBottom: 10, // Increased padding at the bottom
    Width: 300,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    width: 300,
  },
  tabButton: {
    alignItems: 'center',
    paddingTop: 10,
  },
  icon: {
    width: 24,
    height: 24,
    
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 5, 
    width: '25%', 
    alignItems: 'center',

  },
  indicator: {
    width: 7,
    height: 7,
    backgroundColor: 'green',
    borderRadius: 4,
    marginTop: 9,
  },
});
