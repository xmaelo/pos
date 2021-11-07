import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, ImageBackground, Image, SafeAreaView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {themes} from '../themes' 
import { background } from '../assets'
import SwipeButton from '@arelstone/react-native-swipe-button/src/SwipeButton';


const colors = themes.colors

export default function Welcome(props){
    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.content}>
                    <SwipeButton
                        Icon={<Text>X</Text>}
                        onComplete={() => Alert.alert('Completed')}
                        title="Swipe to complete"
                    />
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
        opacity: .75
    },
});