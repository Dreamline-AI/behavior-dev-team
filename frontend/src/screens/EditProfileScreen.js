import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'

export default function EditProfileScreen({ navigation }){
    const [firstName, setFirstName] = useState({value : '', error : ''})
    const [lastName, setLastName] = useState({value : '', error :''})
    const [zipcode, setZipcode] = useState({value : '', error : ''})

    const onSaveChangesPressed = () =>{
        
    }

    return(
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Header> Edit profile </Header>
            <TextInput
                title="Your firstName"
                label="Your firstName"
                returnKeyType="next"
                value={firstName.value}
                onChangeText={(text) => setFirstName({ value: text, error: ''})}
                error={!!firstName.error}
                errorText={firstName.error}
            />
            <TextInput
                title="Your lastName"
                label="Your lastName"
                returnKeyType="next"
                value={lastName.value}
                onChangeText={(text) => setLastName({ value: text, error: ''})}
                error={!!lastName.error}
                errorText={lastName.error}
            />
            <TextInput
                title="Your zipcode"
                label="Enter zipcode"
                returnKeyType="next"
                keyboardType="numeric"
                maxLength={5}
                value={zipcode.value}
                onChangeText={(text) => setZipcode({ value: text, error: '' })}
                error={!!zipcode.error}
                errorText={zipcode.error}
            />
            <Button
                color="black"
                mode="contained"
                onPress={onSaveChangesPressed}
                style={{ marginTop: 24 }}
           >
            Save changes
            </Button>
        </Background>
        
    )

}