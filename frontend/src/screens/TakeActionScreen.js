import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'

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

    if (!result.canceled) {
      setPhotos((prevPhotos) => [...prevPhotos, result.uri])
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
      <Text style={styles.header}>Take action</Text>
      <Text style={styles.subHeader}>Unplug for the day</Text>
      <Text style={styles.description}>
        Unplugging your electronics for a day not only reduces your personal
        energy consumption, leading to savings on your electricity bill, but
        also decreases the overall demand on the city's power grid, contributing
        to a more sustainable and efficient energy use across the community
        (mitigate power outages and lower impact of energy production).
      </Text>
      <View style={styles.funFactContainer}>
        <Icon name="bulb-outline" size={24} color="#000" style={styles.icon} />
        <Text style={styles.funFactText}>
          Fun fact: you can save up to $100 per year on your electricity bills
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
              <Icon name="checkmark" size={20} color="black" />
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
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 20,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  funFactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  icon: {
    marginRight: 10,
  },
  funFactText: {
    fontSize: 16,
    flexShrink: 1,
  },
  unplugText: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  photoLabel: {
    fontSize: 16,
    marginVertical: 10,
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
  },
  completeButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
})

export default TakeActionScreen
