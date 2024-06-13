import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import BackButton from '../components/BackButton';

import ACUpgradeIcon from '../assets/incentives/ACUpgradeIcon.png';
import SolarPanelIcon from '../assets/incentives/SolarPanelIcon.png';
import BillDiscountIcon from '../assets/incentives/BillDiscountIcon.png';
import WaterConservationIcon from '../assets/incentives/WaterConservationIcon.png';
import EVSubsidiesIcon from '../assets/incentives/EVSubsidiesIcon.png';
import UnlockGrantIcon from '../assets/incentives/UnlockGrantIcon.png';

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
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerContainer} >
            <BackButton style={styles.backButton} goBack={navigation.goBack} />
            <Header style={styles.headerTitle}>All incentives</Header>
          </View>
          <ScrollView style={styles.listFrame}>
        {incentives.map((incentive, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => goToDetail(incentive.id)}>
            <Image style={styles.image} source={getImagePath(incentive.image)} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{incentive.heading}</Text>
              <Text style={styles.subtitle}>{incentive.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </SafeAreaView>
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
      gap: 8,
      opacity: 1, 
      position: 'initial',
      top: 54,
    },
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      safeArea: {
        flex: 1, 
      },
    //   headerContainer: {
    //     // flexDirection: 'row',
    //     alignItems: 'center',
    //     // justifyContent: 'flex-start',
    //     width: '100%',
    //   },
    headerTitle:{
        paddingTop:'8px',
        paddingLeft:'130px',
        fontWeight:600,
        fontSize: '16px'
    },
    backButton:{
        paddingLeft:'20px'
    },
      headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        zindex: '1',
        position: 'fixed',
        paddingHorizontal: 16
    },
      listFrame: {
        width: '100%',
        // paddingTop: '80px',
        height: '100px',
        marginTop: '60px'
        // height: '80%',
        // flex: 1
      },
    //   headerTitle: {
    //     marginLeft: 36, 
    //   },
      card: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#0000000D',
        borderRadius: 6,
        borderWidth: 0.5,
        borderColor: '#0000001A',
        width: 384,
        height: 80,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      image: {
        width: 80,
        height: 80,
        borderRadius: 6,
        marginLeft: 16,
        backgroundColor: 'transparent', 
      },
      textContainer: {
        // flex: 1,
        paddingHorizontal: 8,
        justifyContent: 'center',
      },
      title: {
        fontFamily: 'SFProDisplay-Regular', 
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 24,
        textAlign: 'left',
      },
      subtitle: {
        fontFamily: 'SFProText-Regular', 
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        textAlign: 'left',
      },
  });