import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, ImageBackground, Image, SafeAreaView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {themes} from '../themes' 
import { background, thumbIcon, logoB } from '../assets'
import SwipeButton from 'rn-swipe-button';
import  Head  from '../components/Header'

const colors = themes.colors

export default function NewOrder(props){
    return (
        <View style={styles.container}>
            <Head />
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.content}>
                    <View style={styles.logo}>
                        <Image source={logoB} style={{width: 200, height: 30}} />
                        <Text style={styles.text}>
                            Order your menu
                        </Text>
                    </View>
                    <View style={styles.SwipeButton}>
                    </View>
                </View>
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
    content: {
        flex: 1,
        backgroundColor: 'white',
        opacity: .75,
        // paddingTop: hp('80%'),
        // paddingHorizontal: wp('10%')
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