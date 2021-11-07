import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, ImageBackground, Image, SafeAreaView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {themes} from '../themes' 
import { menu, back, logoB } from '../assets'


const colors = themes.colors

export default function Head(props){
    return (
        <View style={styles.header}>
            <Image source={back} style={{width: 20, height: 20}} />
            <Image source={logoB} style={{width: 200, height: 30}} />
            <Image source={menu} style={{width: 20, height: 30}} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp('3%')
    },
});