import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import {UserPic} from '../components/UserPic'
import Paragraph from '../components/Paragraph'
import ProgressBar from 'react-native-progress/Bar';


export default function ProfileScreen({ route, navigation }){
    const { userName } = route.params;


    return(
        <Background>
            <BackButton goBack={navigation.goBack}/>
            <Header> Your Profile </Header>
            <UserPic name={userName}/>
            <Paragraph> Eco Novice </Paragraph>
            <View>
                <ProgressBar progress={0.5} width={200} height={5} color={'green'}/>
            </View>
        </Background>
    )
}