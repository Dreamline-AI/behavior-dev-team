import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { getStatusBarHeight } from 'react-native-status-bar-height'

import ACUpgradeIcon from '../assets/incentives/wind.svg';
import SolarPanelIcon from '../assets/incentives/sun.svg';
import BillDiscountIcon from '../assets/incentives/dollar-sign.svg';
import WaterConservationIcon from '../assets/incentives/droplet.svg';
import EVSubsidiesIcon from '../assets/incentives/truck.svg';
import UnlockGrantIcon from '../assets/incentives/lock.svg';

export default function IncentivesList({ navigation }) {
  const [incentives, setIncentives] = useState([]);

  useEffect(() => {
    // Fetch incentives list from backend
    fetch('http://localhost:8080/api/incentives')
      .then(response => response.json())
      .then(data => setIncentives(data))
      .catch(error => console.error('Error fetching incentives:', error));
  }, []);

      const goToDetail = (incentive) => {
        navigation.navigate('IncentiveDetailPage', { incentive });
      };

      const getImagePath = (type) => {
        switch (type) {
          case 'ACUpgradeIcon':
            return ACUpgradeIcon;
          case 'SolarPanelIcon':
            return SolarPanelIcon;
          case 'BillDiscountIcon':
            return BillDiscountIcon;
          case 'WaterConservationIcon':
            return WaterConservationIcon;
          case 'EVSubsidiesIcon':
            return EVSubsidiesIcon;
          case 'UnlockGrantIcon':
            return UnlockGrantIcon;
          default:
            return null; // or some default icon
        }
      };
  
    return (
      <Background>
        {/* <SafeAreaView style={styles.safeArea}> */}
          <View style={styles.headerContainer} >
            <BackButton style={styles.backButton} goBack={navigation.goBack} />
            <Header style={styles.headerTitle}>All incentives</Header>
          </View>
          <ScrollView style={styles.listFrame}>
        {incentives.map((incentive, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => goToDetail(incentive.id)}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={getImagePath(incentive.image)} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{incentive.heading}</Text>
              <Text style={styles.subtitle}>{incentive.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* </SafeAreaView> */}
    {/* </View> */}
      </Background>
    );
  }
  
  const styles = StyleSheet.create({
    topNavigation: {
      width: 390,
      height: 38,
      paddingTop: 8,
      paddingHorizontal: 0,
    //   flexDirection: 'row', 
      alignItems: 'center',
    //   justifyContent: 'flex-start', 
      // gap: 8,
      opacity: 1, 
      // position: 'initial',
      top: 54,
    },
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      // safeArea: {
      //   flex: 1, 
      //   height: '100%',
      //   width: '100%'
      // },
    //   headerContainer: {
    //     // flexDirection: 'row',
    //     alignItems: 'center',
    //     // justifyContent: 'flex-start',
    //     width: '100%',
    //   },
    headerTitle:{
      // height: 10 + getStatusBarHeight(),
      color: '#000',
      fontFamily: 'Poppins',
      font: 'normal',
      fontWeight: 400,
      paddingTop:'8px',
      // textAlign: 
      paddingLeft:'130px',
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
      listFrame: {
        display: 'flex',
        width: '100%',
        padding: '16px 8px',
        flexDirection: 'column',
        // gap: '8px',
        height: '100%'- getStatusBarHeight(),
        marginTop: 35 + getStatusBarHeight(),
      },
    //   headerTitle: {
    //     marginLeft: 36, 
    //   },
      card: {
        flexDirection: 'row',
        alignItems: 'center',
        // // backgroundColor: '#0000000D',
        // borderRadius: 6,
        // borderWidth: 0.5,
        // borderColor: '#0000001A',
        width: '100%',
        minHeight: '80px',
        maxHeight: '20%',
        marginVertical: '2%',
        marginHorizontal: '0%',
        // justifyContent: 'space-between',
        borderRadius: 6,
        border: '0.5px solid rgba(0, 0, 0, 0.10)',
      },
      image: {
        borderRadius: '6px',
        display: 'flex',
        width: 24,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        // marginLeft: 10,
      },
      imageContainer: {
        height: '100%',
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#0000000d',
      },
      textContainer: {
        // flex: 1,
        paddingHorizontal: 8,
        // justifyContent: 'center',
      },
      title: {
        // fontFamily: 'SFProDisplay-Regular', 
        // fontSize: 18,
        // fontWeight: '500',
        // lineHeight: 24,
        textAlign: 'left',
        // alignSelf: 'stretch',
        color: '#000000',
        fontFamily: "SF Pro Display",
        fontSize: '18px',
        fontWeight: '500',
        fontStyle: 'normal',
        // lineHeight: '24px', /* 133.333% */
      },
      subtitle: {
        alignSelf: 'stretch',
        fontFamily: 'SF Pro Text', 
        fontSize: 12,
        fontWeight: '400',
        fontStyle: 'normal',
        lineHeight: 16,
        color: '#000000b3',
        // textAlign: 'left',
      },
  });