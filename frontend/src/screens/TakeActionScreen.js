import React, { useState } from 'react';
import { View, Text, CheckBox, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const TakeActionScreen = ({ navigation }) => {
  const [checks, setChecks] = useState({
    tv: false,
    ac: false,
    washerDryer: false,
    vacuum: false,
  });

  const [image, setImage] = useState(null);

  const handleCheckboxChange = (name) => {
    setChecks((prevChecks) => ({
      ...prevChecks,
      [name]: !prevChecks[name],
    }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('tv', checks.tv);
    formData.append('ac', checks.ac);
    formData.append('washerDryer', checks.washerDryer);
    formData.append('vacuum', checks.vacuum);

    if (image) {
      formData.append('image', {
        uri: image,
        name: 'verification.jpg',
        type: 'image/jpeg',
      });
    }

    try {
      const response = await fetch('http://localhost:19006/api/takeactions', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response:', responseData);
        // Navigate to the next screen upon successful API call
        navigation.navigate('Triviatoactionconnect');
      } else {
        console.error('API call failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('API call error:', error);
    }
  };



  const allChecked = Object.values(checks).every(Boolean);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Unplug for the day</Text>
      <Text style={styles.description}>
        Unplugging your electronics for a day not only reduces your personal energy consumption,
        leading to savings on your electricity bill, but also decreases the overall demand on the
        city's power grid, contributing to a more sustainable and efficient energy use across the
        community (mitigate power outages and lower impact of energy production).
      </Text>
      <View style={styles.funFact}>
        <View style={styles.bulbIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C15.87 2 19 5.13 19 9C19 11.28 17.93 13.36 16.19 14.47L15.94 14.64L15.7 14.84L14.63 15.84L14.42 16.04L14.33 16.17C14.13 16.44 14 16.72 14 17V18C14 18.55 14.45 19 15 19H16C16.55 19 17 19.45 17 20V21C17 21.55 16.55 22 16 22H8C7.45 22 7 21.55 7 21V20C7 19.45 7.45 19 8 19H9C9.55 19 10 18.55 10 18V17C10 16.72 9.87 16.44 9.67 16.17L9.58 16.04L9.37 15.84L8.3 14.84L8.06 14.64L7.81 14.47C6.07 13.36 5 11.28 5 9C5 5.13 8.13 2 12 2ZM13 18H11V19H13V18ZM13 16H11V17H13V16ZM12 4C9.24 4 7 6.24 7 9C7 10.66 7.83 12.09 9.15 12.83L9.76 13.2L11 14.29V15H13V14.29L14.24 13.2L14.85 12.83C16.17 12.09 17 10.66 17 9C17 6.24 14.76 4 12 4Z" fill="#000"/>
          </svg>
        </View>
        <Text style={styles.funFactText}>
          <Text style={styles.bold}>Fun fact:</Text> you can save up to $100 per year on your
          electricity bills by simply unplugging all of your electronics once a month!
        </Text>
      </View>
      <Text style={styles.unplugItemsText}>Unplug these items for 24 hours</Text>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={checks.tv}
          onValueChange={() => handleCheckboxChange('tv')}
        />
        <Text>TV</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={checks.ac}
          onValueChange={() => handleCheckboxChange('ac')}
        />
        <Text>AC</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={checks.washerDryer}
          onValueChange={() => handleCheckboxChange('washerDryer')}
        />
        <Text>Washer + dryer</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={checks.vacuum}
          onValueChange={() => handleCheckboxChange('vacuum')}
        />
        <Text>Vacuum cleaner</Text>
      </View>
      <Text style={styles.photoVerificationText}>Add photo verification</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.plusSign}>+</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity
        style={[styles.completeButton, (!allChecked || !image) && styles.completeButtonDisabled]}
        onPress={() => navigation.navigate('Triviatoactionconnect')}
        disabled={!allChecked || !image}
      >
        <Text style={styles.completeButtonText}>Complete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  funFact: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#000000',
  },
  bulbIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  funFactText: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  unplugItemsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  photoVerificationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  imagePicker: {
    width: 50,
    height: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 16,
  },
  plusSign: {
    fontSize: 32,
    color: '#888',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  completeButton: {
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButtonDisabled: {
    backgroundColor: '#888',
  },
  completeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TakeActionScreen;
