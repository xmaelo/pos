import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, Animated, ImageBackground, Image, TouchableWithoutFeedback} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {themes} from '../themes' 
import { background, thumbIcon, dg } from '../assets'
import SwipeButton from 'rn-swipe-button';
import  Head  from '../components/Header'
import  Bottom  from '../components/Bottom'
import {Picker} from '@react-native-picker/picker';
import { Switch, TextInput } from 'react-native-paper';

const colors = themes.colors
export default function ValidateOrder(props){
    const pickerRef = useRef();
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const [nombre, setNombre] = React.useState('1');
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }



    return (
        <View style={styles.container}>
            <Head navigation={props.navigation} goBack logo menu/>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.content}>
                    <Text style={styles.Title}>Validation</Text>

                    <View style={[styles.card, styles.shadowProp]}>
                        
                        <View style={{...styles.textCard}}>
                            <Text style={styles.head}>Date: 11/11/2021</Text>
                            <Text style={styles.head}>Table: T01235</Text>
                            <Text style={styles.desc}>No: 11203.10Z</Text>
                        </View>


                        <View style={{flexDirection: 'column', justifyContent: 'space-between', ...styles.textCard}}>
                            <Text style={{...styles.head, color: colors.primary, fontSize: 15, fontWeight: 'bold'}}>
                                Payé: 10.000 FCFA 
                            </Text>
                            <Text style={{...styles.head, color: colors.primary, fontSize: 15, fontWeight: 'bold'}}>
                                Reste: 1.500 FCFA
                            </Text>
                            <Text style={{...styles.head, color: colors.primary, fontSize: 15, fontWeight: 'bold'}}>
                                Total: 8.500 FCFA
                            </Text>
                        </View>
                    </View>
                        <View style={styles.drop}>
                            <Picker
                                mode="dropdown"
                                ref={pickerRef}
                                selectedValue={null}
                            >
                                <Picker.Item label="Selectionner la table" value={null} />
                                <Picker.Item label="TO 1236" value="java" />
                                <Picker.Item label="TO 1237" value="js" />
                            </Picker>
                        </View>
                        <View style={{width: wp('90%'), marginTop: 10}}>
                            <TextInput
                                label="Nombre de plat"
                                keyboardType = 'numeric'
                                mode="outlined"
                                value={nombre}
                                onChangeText={text => setNombre(text)}
                            />
                        </View>
                        <View style={{width: wp('90%'), marginTop: 10}}>
                            <TextInput
                                label="Montant encaissé"
                                keyboardType = 'numeric'
                                mode="outlined"
                                value={nombre}
                                onChangeText={text => setNombre(text)}
                            />
                        </View>
                </View>
                <Bottom navigation={props.navigation} print/>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    containers: {
        flex: 1,
        paddingHorizontal: wp('3%')
    },
    image: {
        flex: 1,
        
    },
    textCard: {
        padding: 5,
    },
    head: {
        fontSize: 17,
        color: "#1E1E1E"
    },
    desc: {
        fontSize: 12,
        color: "#1E1E1E"
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 2,
        paddingBottom: 5,
        paddingHorizontal: 0,
        width: '94%',
        margin: 2,
        marginTop: 10
      },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.2,
        // elevation: 100,
    },

    drop:{
        borderWidth: 1,
        width: wp('90%'),
        borderColor: "#1E1E1E",
        borderRadius: 20,
        backgroundColor: "white",
        marginTop: 10,
        // marginLeft: 4
    },
    search: {
        backgroundColor: 'white',
        paddingTop: 10,
        marginTop: 10,
        paddingBottom: 10,
        width: wp('90%'),
        paddingLeft: 10
    },
    search2: {
        fontSize: 19,
        color: '#1E1E1E'
    },
    content: {
        flex: 1,
        backgroundColor: 'rgba(211, 212, 211, .6)',
        // opacity: .6,
        position: 'relative',
        paddingTop: hp('3%'),
        // justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingHorizontal: wp('3%')
    },
    Title: {
        fontSize: 28,
        fontWeight: '100',
        position: 'relative',
        color: '#3C3C3C',
        
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