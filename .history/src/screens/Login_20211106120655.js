import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, ScrollView, Animated, ImageBackground, Image, SafeAreaView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {themes} from '../themes' 
import { background, thumbIcon, logoB } from '../assets'
import SwipeButton from 'rn-swipe-button';
import  Head  from '../components/Header'
import  Bottom  from '../components/Bottom'
import { Title, Text } from 'react-native-paper';

const colors = themes.colors

export default function Login(props){
    return (
        <View style={styles.container}>
            <Head navigation={props.navigation} logo />
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.content}>
                    <Title style={styles.Title}>Ouvrir une session</Title>
                </View>
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
        fontSize: 22,
        fontWeight: '100'
    },
    content: {
        flex: 1,
        backgroundColor: '#D3D4D3',
        opacity: .6,
        paddingTop: hp('7%'),
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