import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableHighlight, StyleSheet, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {themes} from '../themes' 
import { user, save, archive, home, login, exit } from '../assets'


const colors = themes.colors

export default function Bottom(props){
    return (
        <View style={styles.Bottom}>
                {!login&&
                    <TouchableOpacity onPress={() =>props.navigation.navigate("Home")} >
                        <Image source={home} style={{width: 20, height: 20}} />
                    </TouchableOpacity>
                }
                {props.home ?
                    <TouchableOpacity onPress={() =>props.navigation.navigate("NewOrder")} >
                        <Image source={archive} style={{width: 90, height: 90, marginTop: -40}} />
                    </TouchableOpacity>
                    : props.order ?
                
                    <TouchableOpacity onPress={() =>props.navigation.navigate("ValidateOrder")} >
                        <Image source={archive} style={{width: 90, height: 90, marginTop: -40}} />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={() =>props.navigation.navigate("Home")} >
                        <Image source={login} style={{width: 90, height: 90, marginTop: -40}} />
                    </TouchableOpacity>

                }
                {props.print ?
                    <TouchableOpacity onPress={() =>props.navigation.navigate("Welcome")} >
                        <Image source={exit} style={{width: 20, height: 20}} />
                    </TouchableOpacity>
                     :
                !props.home ?
                    <Image source={exit} style={{width: 20, height: 20}} />
                     :
                     <TouchableOpacity onPress={() =>props.navigation.navigate("Welcome")} >
                        <Image source={exit} style={{width: 20, height: 20}} />
                    </TouchableOpacity>
                }
        </View>
    )
}

const styles = StyleSheet.create({
    Bottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingTop: 20,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp('5%'),
        paddingBottom: 15,
        backgroundColor: '#FFFFFF',
        opacity: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    row: {
        flexDirection: 'row'
    }
});