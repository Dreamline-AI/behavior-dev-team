import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../core/theme'
import BulbIcon from '../assets/BulbIcon.png'
import Circle from '../assets/Circle.png'

const TakeActionScreen = () => {
  const navigation = useNavigation()
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

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    console.log('result',result)
    if (!result.canceled) {
      // setPhotos((prevPhotos) => [...prevPhotos, result.uri])
      setPhotos((prevPhotos) => {
        const newPhotos = [...prevPhotos, result.assets[0].uri]
        console.log('Photos after upload:', newPhotos)
        return newPhotos
      })
    }
  }
  
  const handleDeletePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    console.log('Items unplugged:', checkedItems)
    console.log('Photos:', photos)
    navigation.navigate('Triviatoactionconnect')
    // Add further submission logic here
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.header}>Take action</Text>
      </View>
      <Text style={styles.subHeader}>Unplug for the day</Text>
      <Text style={styles.description}>
        Unplugging your electronics for a day not only reduces your personal
        energy consumption, leading to savings on your electricity bill, but
        also decreases the overall demand on the city's power grid, contributing
        to a more sustainable and efficient energy use across the community
        (mitigate power outages and lower impact of energy production).
      </Text>
      <View style={styles.funFactContainer}>
        <View style={styles.iconContainer}>
          <Image source={Circle} style={styles.Circle} />
          <Image source={BulbIcon} style={styles.BulbIcon} />
        </View>
        <Text style={styles.funFactText}>
          <b>Fun fact:</b> you can save up to $100 per year on your electricity bills
          by simply unplugging all of your electronics once a month!
        </Text>
      </View>
      <Text style={styles.unplugText}>Unplug these items for 24 hours</Text>
      {['tv', 'ac', 'washerDryer', 'vacuumCleaner'].map((item) => (
        <View style={styles.checkboxContainer} key={item}>
          <TouchableOpacity
            onPress={() => handleCheckboxChange(item)}
            style={styles.checkbox}
          >
            {checkedItems[item] && (
              <Icon name="checkmark" size={18} color="black" />
            )}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            {item === 'washerDryer'
              ? 'Washer + Dryer'
              : item.replace(/([A-Z])/g, ' $1').toUpperCase()}
          </Text>
        </View>
      ))}
      <Text style={styles.photoLabel}>Add photo verification</Text>
      <View style={styles.photoContainer}>
        {photos.map((photo, index) => (
          <View key={index} style={styles.photoWrapper}>
            <Image source={{ uri: photo }} style={styles.photo} />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeletePhoto(index)}
            >
              <Icon name="close" size={16} color="white" />
            </TouchableOpacity>
          </View> 
        ))}
        {photos.length < 4 && (
          <TouchableOpacity
            onPress={handlePhotoUpload}
            style={styles.uploadButton}
          >
            <Icon name="add" size={30} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={[
          styles.completeButton,
          { backgroundColor: isCompleteButtonEnabled ? '#000' : '#ccc' },
        ]}
        disabled={!isCompleteButtonEnabled}
      >
        <Text style={styles.completeButtonText}>Complete</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  header: {
    fontSize: 16,
    color: theme.colors.greet,
    fontWeight: 500,
    lineHeight: 22,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 22,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 22,
    letterSpacing: 0.16,
    marginBottom: 20,
  },
  funFactContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
  },
  iconContainer: {
    position: 'relative',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderradius: 27,
    gap: 16,
    bottom:2,
  },  
  Circle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  BulbIcon: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  funFactText: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 19,
    marginLeft: 16,
    flexShrink: 1,
  },
  unplugText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 19,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 14,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 19,
  },
  photoLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  photoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  photoWrapper: {
    position: 'relative',
    margin: 5,  
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#888',
    borderRadius: 8,
    padding: 2,
  },
  uploadButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
  },
  completeButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
})

export default TakeActionScreen;