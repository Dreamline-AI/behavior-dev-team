import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'

export default function EditProfileScreen({route, navigation }){
    const { name } = route.params;
    const [fn, ...ln] = name.split(' ');
    const [firstName, setFirstName] = useState({value : fn, error : ''})
    const [lastName, setLastName] = useState({value : ln.join(' '), error :''})
    const [zipcode, setZipcode] = useState({value : '', error : ''})
    const onSaveChangesPressed = () =>{
    }

    return(
        <Background>
            <View style={styles.headerContainer}>
                <BackButton goBack={navigation.goBack} />
                <Header style={styles.header}> Edit profile </Header>
            </View>
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
                style={[styles.button]}
           >
            Save changes
            </Button>
        </Background>
        
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "black",
        marginTop: 24,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 8,
        paddingTop: 16,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        
        },
    header: {
        textAlign: 'center',
        flex: 1,
    
    },
});  

