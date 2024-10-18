import { useNavigation, useNavigationState } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styles from "../commonStyles"

export default function BottomNavigationBar({ userName, userFirstName, userLastName, userId, zipcode}) {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Home');

  const currentRouteName = useNavigationState(state => state.routes[state.index]?.name);

  useEffect(() => {
    // console.log("User First Name and Last Name:", userName);
    switch (currentRouteName) {
      case 'Dashboard':
        setActiveTab('Home');
        break;
      case 'ProfileScreen':
        setActiveTab('Profile');
        break;
      case 'RewardScreen':
        setActiveTab('Rewards');
        break;
      case 'ShopScreen':
        setActiveTab('Shop');
        break;
      default:
        setActiveTab('Home');
        break;
    }
  }, [currentRouteName]);

  const changeTab = (tabName) => {
    setActiveTab(tabName);
    switch (tabName) {
      case 'Home':
        navigation.navigate('Dashboard', { userName : userName, userFirstName : userFirstName, userLastName : userLastName, userId : userId });
        break;
      case 'Profile':
        navigation.navigate('ProfileScreen', { userName : userName, userFirstName : userFirstName, userLastName : userLastName, userId : userId, zipcode : zipcode });
        break;
      case 'Rewards':
        navigation.navigate('RewardScreen');
        break;
      case 'Shop':
        navigation.navigate('IncentivesList'); // create the screen later
        break;
      default:
        break;
    }
  };

  const tabIndex = ['Home', 'Profile', 'Rewards', 'Shop'].indexOf(activeTab);
  const tabWidth = 305 / 4;

  return (
    <View style={styles.bottomNavigationBar.container}>
      <View style={styles.bottomNavigationBar.tabBar}>
        <TabButton iconSource={require('../assets/home.png')} label="Home" tabName="Home" onPress={changeTab} activeTab={activeTab} />
        <TabButton iconSource={require('../assets/Profile.png')} label="Profile" tabName="Profile" onPress={changeTab} activeTab={activeTab} />
        <TabButton iconSource={require('../assets/Rewards.png')} label="Rewards" tabName="Rewards" onPress={changeTab} activeTab={activeTab} />
        <TabButton iconSource={require('../assets/Shop.png')} label="Shop" tabName="Shop" onPress={changeTab} activeTab={activeTab} />
      </View>
      {activeTab !== 'Rewards' && (
        <>
          {/* Green circle indicator */}
          <View style={[styles.bottomNavigationBar.indicatorContainer, { left: `${tabWidth * tabIndex + tabWidth / 2 - 7}px` }]}>
            <View style={styles.bottomNavigationBar.indicator} />
          </View>
          {/* Red bar */}
          <View style={[styles.bottomNavigationBar.fixedRedBar, { left: `${tabWidth * 2 + tabWidth / 2 - 14}px` }]} />
        </>
      )}
    </View>
  );
}

const TabButton = ({ iconSource, label, tabName, onPress, activeTab }) => (
  <TouchableOpacity
    style={[styles.bottomNavigationBar.tabButton, activeTab === tabName && styles.bottomNavigationBar.activeTab]}
    onPress={() => onPress(tabName)}
  >
    <Image source={iconSource} style={styles.bottomNavigationBar.icon} />
    <Text style={{ color: activeTab === tabName ? 'black' : 'grey', marginTop: 4, fontSize: 12 }}>{label}</Text>
  </TouchableOpacity>
);


