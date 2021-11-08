import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, ScrollView, Animated, ImageBackground, Image, SafeAreaView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {themes} from '../themes' 
import { background, thumbIcon, logoB } from '../assets'
import SwipeButton from 'rn-swipe-button';
import  Head  from '../components/Header'
import  Bottom  from '../components/Bottom'
import { Title, Text, TextInput  } from 'react-native-paper';

const colors = themes.colors

export default function Login(props){
    const [username, setU] = useState('');
    const [password, setPass] = useState("");
    return (
        <View style={styles.container}>
            <Head navigation={props.navigation} logo />
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <ScrollView>
                    <View style={styles.content}>
                        <Text style={styles.Title}>Ouvrir une session</Text>
                        <View style={{width: wp('80%'), marginTop: hp('8%')}}>
                            <TextInput
                                label="Username"
                                mode='outlined'
                                value={username}
                                style={{backgroundColor: 'white', fontSize: 20}}
                                onChangeText={text => setU(text)}
                            />
                            <View style={{height: 20}}/>
                            <TextInput
                                label="Password"
                                style={{backgroundColor: 'white', fontSize: 20}}
                                mode='outlined'
                                secureTextEntry
                                value={password}
                                onChangeText={text => setPass(text)}
                            />
                        </View>
                    </View>
                </ScrollView>
                <Bottom navigation={props.navigation} login/>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    image: {
        flex: 1,
    },
    Title: {
        fontSize: 28,
        fontWeight: '100',
        color: 'black',
        color: '#3C3C3C'
    },
    content: {
        flex: 1,
        backgroundColor: 'rgba(211, 212, 211, .6)',
        // opacity: .6,
        paddingTop: hp('10%'),
        // justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
    },
    SwipeButton: {
        paddingTop: hp('60%'),
    },
    logo: {
        marginTop: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 40,
        fontWeight: "100"
    },
});