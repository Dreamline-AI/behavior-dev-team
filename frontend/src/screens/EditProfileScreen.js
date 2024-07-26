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
            <View style={styles.container}>
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
            </View>
            <View style={styles.footer}>
                <Button
                    color="#D9D9D9"
                    mode="contained"
                    onPress={onSaveChangesPressed}
                    style={styles.saveButton}
                >
                Save changes
                </Button>
            </View>
        </Background>
        
    )
}

const styles = StyleSheet.create({
    
    headerContainer: {
        display: 'flex',
        width: '100%',
        padding: '8px',
        justifyContents: 'center',
        alignItems: 'center',
        gap: '8px',
        
        },
    header: {
        color: theme.colors.greet,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontweight: 510,
        lineheight: 22, 
    
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        //justifyContent: 'center',
      },
      footer: {
        width: '100%',
        paddingHorizontal: 16,
        paddingBottom: 20,
      },
      saveButton: {
        borderRadius: 8,
        width: '100%',
        color: '#FFF',
        fontFamily: theme.colors.greet,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 500,
      },
      
});  

