import { useNavigation, useNavigationState } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BottomNavigationBar({ userName}) {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Home');

  const currentRouteName = useNavigationState(state => state.routes[state.index]?.name);

  useEffect(() => {
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
        navigation.navigate('Dashboard');
        break;
      case 'Profile':
        navigation.navigate('ProfileScreen', { userName });
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
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TabButton iconSource={require('../assets/home.png')} label="Home" tabName="Home" onPress={changeTab} activeTab={activeTab} />
        <TabButton iconSource={require('../assets/Profile.png')} label="Profile" tabName="Profile" onPress={changeTab} activeTab={activeTab} />
        <TabButton iconSource={require('../assets/Rewards.png')} label="Rewards" tabName="Rewards" onPress={changeTab} activeTab={activeTab} />
        <TabButton iconSource={require('../assets/Shop.png')} label="Shop" tabName="Shop" onPress={changeTab} activeTab={activeTab} />
      </View>
      {activeTab !== 'Rewards' && (
        <>
          {/* Green circle indicator */}
          <View style={[styles.indicatorContainer, { left: `${tabWidth * tabIndex + tabWidth / 2 - 5}px` }]}>
            <View style={styles.indicator} />
          </View>
          {/* Red bar */}
          <View style={[styles.fixedRedBar, { left: `${tabWidth * 2 + tabWidth / 2 - 5}px` }]} />
        </>
      )}
    </View>
  );
}

const TabButton = ({ iconSource, label, tabName, onPress, activeTab }) => (
  <TouchableOpacity
    style={[styles.tabButton, activeTab === tabName && styles.activeTab]}
    onPress={() => onPress(tabName)}
  >
    <Image source={iconSource} style={styles.icon} />
    <Text style={{ color: activeTab === tabName ? 'black' : 'grey', marginTop: 4, fontSize: 12 }}>{label}</Text>
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
    width: '100%',
    marginBottom: 5,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    width: '100%',
  },
  tabButton: {
    alignItems: 'center',
    paddingTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 3,
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 5,
    height: 5,
    backgroundColor: '#62ff90',
    borderRadius: 10,
  },
  fixedRedBar: {
    position: 'absolute',
    bottom: 5,
    height: 5,
    width: 5,
    backgroundColor: '#ff4252',
    borderRadius: 10,
  },
});
