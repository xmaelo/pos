import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, TouchableHighlight, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, ImageBackground, Image, SafeAreaView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {themes} from '../themes' 
import { menu, back, logoB } from '../assets'


const colors = themes.colors

export default function Head(props){
    return (
        <View style={styles.header}>
            {props.goBack&&
                <TouchableWithoutFeedback onPress={() =>props.navigation.goBack(null)} >
                    <Image source={back} style={{width: 20, height: 15}} />
                </TouchableWithoutFeedback>
            }
            {props.logo&&
                <Image source={logoB} style={{width: 150, height: 20, margin: 'auto'}} />
            }
            {props.menu&&
                <Image source={menu} style={{width: 20, height: 15}} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 30,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp('5%'),
        paddingBottom: 25,
    },
});