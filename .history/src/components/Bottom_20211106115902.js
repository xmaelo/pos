import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableHighlight, StyleSheet, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {themes} from '../themes' 
import { user, save, archive, home, login } from '../assets'


const colors = themes.colors

export default function Bottom(props){
    return (
        <View style={styles.Bottom}>
                <TouchableOpacity onPress={() =>props.navigation.goBack(null)} >
                    <Image source={home} style={{width: 20, height: 20}} />
                </TouchableOpacity>
                {!props.login ?
                    <Image source={archive} style={{width: 90, height: 90, marginTop: -40}} />
                    :
                    <Image source={archive} style={{width: 90, height: 90, marginTop: -40}} />

                }
                {!props.login &&
                    <View style={styles.row}>
                        <Image source={save} style={{width: 20, height: 20}} />
                        <View style={{width: 20}} />
                        <Image source={user} style={{width: 20, height: 20}} />
                    </View>
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