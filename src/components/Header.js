import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, TouchableHighlight, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, ImageBackground, Image, SafeAreaView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {themes} from '../themes' 
import { menu, back, logoB, logo2 } from '../assets'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';

const colors = themes.colors

export default function Head(props){

    const loading = useSelector(p=>p.loading)
    const nav = useNavigation()

    console.log('loadingloading loading', loading)

    return (
        <View style={{...styles.header, justifyContent: props.goBack?'space-between': 'center',}}>
            {props.goBack&&
                <TouchableWithoutFeedback onPress={() =>props.navigation.goBack(null)} >
                    <Image source={back} style={{width: 20, height: 15}} />
                </TouchableWithoutFeedback>
            }
            {props.logo&&
                <TouchableOpacity onPress={()=>nav.navigate('Home')} >
                    <Image source={logo2} style={{width: 150, height: 30}} />
                </TouchableOpacity>
            }
            {props.menu && loading?
                <ActivityIndicator animating={true} color={colors.primary} />
                : props.menu &&
                <Ionicons name="reload" color={colors.primary} size={25}/>
            }
            {props.login && loading && <ActivityIndicator animating={true} color={colors.primary} />}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 30,
        height: 80,
        flexDirection: 'row',
        paddingHorizontal: wp('5%'),
        paddingBottom: 25,
    },
});