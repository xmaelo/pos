import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, ImageBackground, Image, SafeAreaView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {themes} from '../themes' 
import { background, thumbIcon, logo, logo2 } from '../assets'
import SwipeButton from 'rn-swipe-button';
import { getData, onLogin } from '../config';
import { ActivityIndicator } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';



const colors = themes.colors

export default function Welcome(props){

    const [visible, setIsVisible] = React.useState(false)
    async function navigate(){
        try {
            const credentials = await getData()
            if(credentials){
                setIsVisible(true)
                const res =  await onLogin(credentials)
                console.log('res res res', res)
                setIsVisible(false)
                if(res) return props.navigation.navigate('Home')
            }
            return props.navigation.navigate('Login')
            
        } catch (error) {
            console.log('errror loginnn async', e)
        }
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <Spinner
                    visible={visible}
                    textContent={'Chargement...'}
                    textStyle={{color: '#FFF'}}
                />
                <View style={styles.content}>
                    <View style={styles.logo}>
                        <View>
                            <Image source={logo2} style={{width: 200, height: 70}} />
                        </View>
                        <Text style={styles.text}>
                            Order your menu
                        </Text>
                    </View>
                    <View style={styles.SwipeButton}>
                        <SwipeButton 
                            thumbIconImageSource={thumbIcon} 
                            railBackgroundColor={null}
                            railFillBackgroundColor={'white'}
                            shouldResetAfterSuccess
                            onSwipeSuccess={() => navigate()}
                            title="Glisser pour deverouiller"
                            titleColor={'white'}
                            // titleStyles={{fontWeight: 'bold'}}
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
        backgroundColor: 'rgba(65, 155, 214, .8)',
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