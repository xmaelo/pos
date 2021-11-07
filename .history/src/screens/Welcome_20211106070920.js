import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, ImageBackground, Image, SafeAreaView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {themes} from '../themes' 
import { background, thumbIcon, logo } from '../assets'
import SwipeButton from 'rn-swipe-button';


const colors = themes.colors

export default function Welcome(props){
    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.content}>
                    <View style={styles.logo}>
                        <Image source={logo} style={{width: 250, height: 40}} />
                        <Text style={styles.text}>
                            Order your menu
                        </Text>
                    </View>
                    <View style={styles.SwipeButton}>
                        <SwipeButton 
                            thumbIconImageSource={thumbIcon} 
                            railBackgroundColor={null}
                            railFillBackgroundColor={'white'}
                            onSwipeSuccess={() =>
                                Alert.alert('Submitted successfully!')
                            }
                            title="Glisser pour deverouiller"
                            titleColor={'white'}
                            titleStyles={{fontWeight: 'bold'}}
                            //enableReverseSwipe={true}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: colors.primary,
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
        fontSize: '20px',
        // fontWeight: "200"
    },
});