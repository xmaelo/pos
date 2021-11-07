import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, Animated, ImageBackground, Image, TouchableWithoutFeedback} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {themes} from '../themes' 
import { background, thumbIcon, dg, arrow } from '../assets'
import SwipeButton from 'rn-swipe-button';
import  Head  from '../components/Header'
import  Bottom  from '../components/Bottom'
import {Picker} from '@react-native-picker/picker';
import { Button, Surface } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';

const colors = themes.colors

function Drop(props) {

    console.log('value value value', props.value)
    const [items, setItems] = useState([
        {
          label: 'Apple', 
          value: 'apple',
          icon: () => <Image source={dg} style={styles.iconStyle} />
        },
        {
          label: 'Riz', 
          value: 'riz',
          icon: () => <Image source={dg} style={styles.iconStyle} />
        },
        {
          label: 'Banana', 
          value: 'banana',
          icon: () => <Image source={dg} style={styles.iconStyle} />
        },
    ]);
  
    return (
      <DropDownPicker
        open={props.open}
        value={props.value}
        items={items}
        searchable={true}
        placeholder={props.placholder}
        searchPlaceholder="Recherche..."
        setOpen={props.setOpen}
        setValue={props.setValue}
        setItems={setItems}
        multiple={true}
      />
    );
  }
export default function NewOrder(props){

    const [repas, setRepas] = useState([]);
    const [openRepas, setOpenRepas] = useState(false);


    const [showRepas, onRepas] = useState(false);

    const leftButton = (
        <SwipeButtonsContainer
            style={{
                // alignSelf: 'center',
                aspectRatio: 1,
                // flexDirection: 'column',
                padding: 10,
            }}
            
        >
            <TouchableOpacity
                onPress={() => console.log('left button clicked')}
            >
                <Text>Click me !</Text>
            </TouchableOpacity>
        </SwipeButtonsContainer>
    );

    return (
        <View style={styles.container}>
            <Head navigation={props.navigation} goBack logo menu/>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.content}>
                    <Text style={styles.Title}>Nouvelle commande</Text>
                    
                    <View style={styles.button}>
                        <Button 
                            icon={"food"} 
                            color={colors.primary} 
                            labelStyle={{color: 'white'}} 
                            mode="contained" 
                            onPress={() => onRepas(true)}
                        >
                            Repas
                        </Button>
                        <Button 
                            icon={"food-fork-drink"} 
                            style={styles.but} 
                            mode="contained" 
                            onPress={() => console.log('Pressed')}
                            color={colors.primary} labelStyle={{color: 'white'}}
                        >
                            Boisson
                        </Button>
                        <Button 
                            icon="food-drumstick" 
                            style={styles.but} 
                            mode="contained" 
                            onPress={() => console.log('Pressed')}
                            color={colors.primary} labelStyle={{color: 'white'}}
                        >
                            Dessert
                        </Button>
                    </View>
                    <View style={{paddingTop: 15}}>
                        <View>
                            <SwipeItem
                                style={styles.button2}
                                swipeContainerStyle={styles.swipeContentContainerStyle}
                                leftButtons={leftButton}
                            >
                                <Surface style={{...styles.surface, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Image source={dg} style={styles.imageFood} />
                                    <View>
                                        <Text>Surface</Text>
                                        <Text>poulet bien cussiner etc..</Text>
                                    </View>
                                    <View>
                                        <Text>QUantité: 1</Text>
                                        <Text style={{color: colors.primary}} >17 000 FCFA</Text>
                                    </View>
                                </Surface>
                            </SwipeItem>

                            
                            {showRepas &&
                                <Drop 
                                    placholder={"Selectionner le repas"} 
                                    open={openRepas} 
                                    value={repas}
                                    setOpen={setOpenRepas}
                                    setValue={setRepas}
                                />
                            }
                        </View>
                    </View>
                    
                </View>
                <Bottom navigation={props.navigation} order/>
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
    but: {
        marginLeft: 10,
    },
    image: {
        flex: 1,
        
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10
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
    iconStyle: {
        width: 30,
        height: 30
    },
    imageFood: {
        width: wp('28%'),
        height: 80
    },
    surface: {
        padding: 8,
        paddingLeft: 0,
        height: 80,
        width: wp('94%'),
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    swipeContentContainerStyle: {
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderColor: '#e3e3e3',
        borderWidth: 1,
    },
    button2: {
        width: wp('20%'),
        height: 90,
        // marginVertical: 5,
    },
});