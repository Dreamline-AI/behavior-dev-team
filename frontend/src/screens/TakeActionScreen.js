import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../core/theme'
import BulbIcon from '../assets/BulbIcon.png'
import Circle from '../assets/Circle.png'
import CheckIcon from '../assets/check.png' 
import styles from "../commonStyles"
import Background from '../components/Background';

  const TakeActionScreen = ({ route }) => {
  const navigation = useNavigation()
  const { userName, userFirstName, userLastName } = route.params || {};
  const [checkedItems, setCheckedItems] = useState({
    tv: false,
    ac: false,
    washerDryer: false,
    vacuumCleaner: false,
  })

  const [photos, setPhotos] = useState([])
  const [isCompleteButtonEnabled, setIsCompleteButtonEnabled] = useState(false)

  useEffect(() => {
    const allChecked = Object.values(checkedItems).every((checked) => checked)
    const hasEnoughPhotos = photos.length === 4
    setIsCompleteButtonEnabled(allChecked && hasEnoughPhotos)
  }, [checkedItems, photos])

  const handleCheckboxChange = (item) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }))
  }

  const handlePhotoUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!')
      return
    }

    if (photos.length >= 4) {
      alert('You can only upload up to 4 photos.')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    })
    console.log('result', result)
    // console.log('userFirstName:', userFirstName);
    // console.log('userLastName:', userLastName);

    if (!result.canceled) {
      const newPhotos = result.assets
        ? result.assets.map((asset) => asset.uri)
        : [result.uri]
      setPhotos((prevPhotos) => {
        const updatedPhotos = [...prevPhotos, ...newPhotos].slice(0, 4)
        console.log('Photos after upload:', updatedPhotos)
        return updatedPhotos
      })
    }
  }

  const handleDeletePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    console.log('Items unplugged:', checkedItems)
    console.log('Photos:', photos)
    navigation.navigate('Triviatoactionconnect', {
      userName,
      userFirstName,
      userLastName,
    });
  }
  const handleBackPress = () => {
    navigation.navigate('ExitTakingAction', {
      userName,
      userFirstName,
      userLastName,
    });
  };

  return (
    <Background>
    <View style={styles.takeActionScreen.container}>
      <View style={styles.takeActionScreen.headerContainer}>
      <TouchableOpacity onPress={handleBackPress} style={styles.takeActionScreen.backButton}>
          <Icon name="chevron-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.takeActionScreen.backButton}>
          <Icon name="chevron-back" size={24} color={theme.colors.text} />
        </TouchableOpacity> */}
        <Text style={styles.takeActionScreen.header}>Take action</Text>
      </View>
      <Text style={styles.takeActionScreen.subHeader}>Unplug for the day</Text>
      <Text style={styles.takeActionScreen.description}>
        Unplugging your electronics for a day not only reduces your personal
        energy consumption, leading to savings on your electricity bill, but
        also decreases the overall demand on the city's power grid, contributing
        to a more sustainable and efficient energy use across the community
        (mitigate power outages and lower impact of energy production).
      </Text>
      <View style={styles.takeActionScreen.funFactContainer}>
        <View style={styles.takeActionScreen.iconContainer}>
          <Image source={Circle} style={styles.takeActionScreen.Circle} />
          <Image source={BulbIcon} style={styles.takeActionScreen.BulbIcon} />
        </View>
        <Text style={styles.takeActionScreen.funFactText}>
          <b>Fun fact:</b> you can save up to $100 per year on your electricity bills
          by simply unplugging all of your electronics once a month!
        </Text>
      </View>
      <Text style={styles.takeActionScreen.unplugText}>Unplug these items for 24 hours</Text>
      {['tv', 'ac', 'washerDryer', 'vacuumCleaner'].map((item) => (
        <View style={styles.takeActionScreen.checkboxContainer} key={item}>
          <TouchableOpacity
            onPress={() => handleCheckboxChange(item)}
            style={styles.takeActionScreen.checkbox}
          >
            {checkedItems[item] && (
              <Image source={CheckIcon} style={styles.takeActionScreen.checkIcon} /> 
            )}
          </TouchableOpacity>
          <Text style={styles.takeActionScreen.checkboxLabel}>
            {item === 'washerDryer'
              ? 'Washer + Dryer'
              : item.replace(/([A-Z])/g, ' $1').toUpperCase()}
          </Text>
        </View>
      ))}
      <Text style={styles.takeActionScreen.photoLabel}>Add photo verification</Text>
      <View style={styles.takeActionScreen.photoContainer}>
        {photos.map((photo, index) => (
          <View key={index} style={styles.takeActionScreen.photoWrapper}>
            <Image source={{ uri: photo }} style={styles.takeActionScreen.photo} />
            <TouchableOpacity
              style={styles.takeActionScreen.deleteButton}
              onPress={() => handleDeletePhoto(index)}
            >
              <Icon name="close" size={16} color="white" />
            </TouchableOpacity>
          </View> 
        ))}
        {photos.length < 4 && (
          <TouchableOpacity
            onPress={handlePhotoUpload}
            style={styles.takeActionScreen.uploadButton}
          >
            <Icon name="add" size={30} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={[
          styles.takeActionScreen.completeButton,
          { backgroundColor: isCompleteButtonEnabled ? '#000' : '#ccc' },
        ]}
        disabled={!isCompleteButtonEnabled}
      >
        <Text style={styles.takeActionScreen.completeButtonText}>Complete</Text>
      </TouchableOpacity>
    </View>
    </Background>
  )
}


export default TakeActionScreen;
