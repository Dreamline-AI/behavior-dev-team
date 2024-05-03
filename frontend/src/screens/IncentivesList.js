import React from 'react';
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
    const incentives = [
        {
          title: 'Stay Cool and Save Money',
          subtitle: 'Efficient AC Upgrade',
          image: ACUpgradeIcon,
        },
        {
          title: 'Solar Panels Installation',
          subtitle: 'Free Solar Panel Installation',
          image: SolarPanelIcon,
        },
        {
          title: 'Utility Bill Discounts',
          subtitle: 'Lower Bills, Happier Home',
          image: BillDiscountIcon,
        },
        {
          title: 'Water Conservation Rebates',
          subtitle: 'High-Efficiency Fixtures',
          image: WaterConservationIcon,
        },
        {
          title: 'Transportation Incentives',
          subtitle: 'Subsidies for Electric Vehicles (EVs)',
          image: EVSubsidiesIcon,
        },
        {
          title: 'Earn 250 more points to unlock',
          subtitle: 'Grant',
          image: UnlockGrantIcon,
        },
        {
            title: 'Stay Cool and Save Money',
            subtitle: 'Efficient AC Upgrade',
            image: ACUpgradeIcon,
          },
          {
            title: 'Solar Panels Installation',
            subtitle: 'Free Solar Panel Installation',
            image: SolarPanelIcon,
          },
          {
            title: 'Utility Bill Discounts',
            subtitle: 'Lower Bills, Happier Home',
            image: BillDiscountIcon,
          },
          {
            title: 'Water Conservation Rebates',
            subtitle: 'High-Efficiency Fixtures',
            image: WaterConservationIcon,
          },
          {
            title: 'Transportation Incentives',
            subtitle: 'Subsidies for Electric Vehicles (EVs)',
            image: EVSubsidiesIcon,
          },
          {
            title: 'Earn 250 more points to unlock',
            subtitle: 'Grant',
            image: UnlockGrantIcon,
          },
          {
            title: 'Stay Cool and Save Money',
            subtitle: 'Efficient AC Upgrade',
            image: ACUpgradeIcon,
          },
          {
            title: 'Solar Panels Installation',
            subtitle: 'Free Solar Panel Installation',
            image: SolarPanelIcon,
          },
          {
            title: 'Utility Bill Discounts',
            subtitle: 'Lower Bills, Happier Home',
            image: BillDiscountIcon,
          },
          {
            title: 'Water Conservation Rebates',
            subtitle: 'High-Efficiency Fixtures',
            image: WaterConservationIcon,
          },
          {
            title: 'Transportation Incentives',
            subtitle: 'Subsidies for Electric Vehicles (EVs)',
            image: EVSubsidiesIcon,
          },
          {
            title: 'Earn 250 more points to unlock',
            subtitle: 'Grant',
            image: UnlockGrantIcon,
          },
      ];

      const goToDetail = (incentive) => {
        navigation.navigate('IncentiveDetailPage', { incentive });
      };
  
    return (
      <Background>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerContainer}>
            <BackButton goBack={navigation.goBack} />
            <Header>All incentives</Header>
          </View>
          <ScrollView style={styles.listFrame}>
        {incentives.map((incentive, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => goToDetail(incentive)}>
            <Image style={styles.image} source={incentive.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{incentive.title}</Text>
              <Text style={styles.subtitle}>{incentive.subtitle}</Text>
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
        // flex: 1, 
      },
      headerContainer: {
        // flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'flex-start',
        width: '100%',
      },
      listFrame: {
        width: '100%',
      },
      headerTitle: {
        marginLeft: 36, 
      },
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