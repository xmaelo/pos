import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, Animated, ImageBackground, Image, Alert, TouchableWithoutFeedback} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {themes} from '../themes' 
import { background, thumbIcon, dg } from '../assets'
import SwipeButton from 'rn-swipe-button';
import  Head  from '../components/Header'
import  Bottom  from '../components/Bottom'
import {Picker} from '@react-native-picker/picker';
import { Switch } from 'react-native-paper';
import { request_get, request_post, imageBase } from '../config';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Badge } from 'react-native-elements'


const colors = themes.colors
const ITEM_MARGIN_BOTTOM = 8;
const ITEM_PADDING = 10;
//This is height of 1 item
const ITEM_SIZE = ITEM_PADDING * 8 + ITEM_MARGIN_BOTTOM;


export default function Home(props){
    const pickerRef = useRef();
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const [menus, setMenus] = React.useState([])
    const [choice, setChoice] = React.useState(null) 
    
    const initalMenu = useSelector(p => p.consommables)
    const cart = useSelector(p => p.cart)
    const [counter, setCounter] = React.useState(cart?.length) 

    const dispatch = useDispatch()

    React.useEffect(()=>{
        (async()=>{
            
            onReload()
            onLoadTyeOnWait()
            //dispatch({type: "LOANDING"})
        })()
    }, [])

    async function onLoadTyeOnWait(){
        try {
          const result =  await request_get('order_states?page=1&task_name=en_attente')
          console.log("result result result", result)
          if(result&&result['hydra:member']&&result['hydra:member'].length > 0){
            dispatch({type: "STATUS", data: result['hydra:member'][0]})
          }
        } catch (error) {
          console.log('onLoadTyeOnWait', error)
        }
      }

    function onFilter(itemValue){
        if(itemValue){
            setMenus(initalMenu.filter(a =>a.typeConsommable?.task_name === itemValue))
        }else{
            setMenus(initalMenu)
        }
        setChoice(itemValue)
    }

    async function onReload(){

        console.log('onReloadonReload onReload start here')
        dispatch({type: "LOANDING"})
        try {
          const tables = await request_get('consommables')
        
         // setTableLoad(false)
          if(tables&&tables['hydra:member']){
            let t = tables['hydra:member']
            console.log('t*************', t)
            setMenus(t)
            dispatch({type: "SAVE_CONSO", consommables: t})
          }
        } catch (error) {
          console.log('error fetching table >>', error)
          //setTableLoad(false)  
        }
        dispatch({type: "LOANDING"})
    }

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    function open() {
        pickerRef.current.focus();
    }
    function onAddToCart(item) {
        const c = cart;
        c.push(item)
        console.log('c', c)
        setCounter(c.length)
        dispatch({type: "CART", data: c})
    }
    function onRemove(item) {
        const c = cart;
        const result = c.filter(i => i.id !== item.id);
        setCounter(result.length)
        dispatch({type: "CART", data: result})
    }

    function close() {
        pickerRef.current.blur();
    }


    const renderItem = ({item, index}) => {
        const scale = scrollY.interpolate({
            inputRange: [
                -1, 0, 
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 8)
            ],
            outputRange: [1, 1, 1, 0]
        })
        const opacity = scrollY.interpolate({
            inputRange: [
                -1, 0, 
                ITEM_SIZE * index,
                ITEM_SIZE * (index + .6)
            ],
            outputRange: [1, 1, 1, 0]
        })
        return (
                <>
                        <View style={[styles.card, styles.shadowProp]}>
                            {cart&&cart.find(elt => elt.id === item.id) &&
                                <TouchableOpacity
                                    onPress={() =>onRemove(item)}
                                    style={{ position: "relative", marginTop: -11 }}
                                >
                                        <Ionicons name="close-circle" color={"red"} size={30} style={{borderRadius: 100}}/>
                                </TouchableOpacity>
                            }
                                <TouchableWithoutFeedback
                                    onLongPress={()=>{
                                        console.log('****************')
                                        onAddToCart(item)
                                    }}
                                >
                                    <View>
                                        <View>
                                                <Image source={{uri: imageBase+item.picture}} style={{width: '100%', height: 100}} />
                                            
                                        </View>
                                        <View style={{...styles.textCard}}>
                                            <Text style={styles.head}>{item.name}</Text>
                                            <Text style={styles.desc}>{item.description}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', ...styles.textCard}}>
                                            <Text style={{...styles.head, color: colors.primary, fontSize: 12, fontWeight: 'bold'}}>
                                                {item.price} FCFA
                                            </Text>
                                            {/* <Switch value={isSwitchOn} onValueChange={onToggleSwitch} /> */}
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                        </View>
                </>
        )
    }

    return (
        <View style={styles.container}>
            <Head navigation={props.navigation} goBack logo menu/>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.content}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.Title}>Menu du jour</Text>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                if(cart.length ===0) return Alert.alert('Rien dans le panier !')
                                props.navigation.navigate("NewOrder")
                            }
                            }
                        >
                            <Ionicons name="cart" color={colors.primary} size={40} style={{borderRadius: 100}}/>
                        </TouchableWithoutFeedback>
                        <Badge
                            status="error"
                            value={cart.length}
                            containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                        />
                    </View>
                    <View style={styles.drop}>
                        <Picker
                            mode="dropdown"
                            ref={pickerRef}
                            selectedValue={choice}
                            // style={{ height: 50, width: 250, backgroundColor: 'white', borderRadius: 50 }}
                            onValueChange={(itemValue, itemIndex) => onFilter(itemValue)}
                        >
                            <Picker.Item label="Tous" value={null} />
                            <Picker.Item label="Dessert" value="dessert" />
                            <Picker.Item label="Repas" value="repas" />
                            <Picker.Item label="Boisson" value="boisson" />
                        </Picker>
                    </View>
                    <View style={styles.search}>
                        <Text style={styles.search2}>Liste de menu</Text>
                    </View>

                    <SafeAreaView style={styles.containers}>
                        <Animated.FlatList
                            data={menus}
                            numColumns={2}
                            showsHorizontalScrollIndicator={false}
                            persistentScrollbar={false}
                            onScroll={Animated.event(
                                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                                {useNativeDriver: true}
                            )}
                            keyExtrator={item => 'key=${item.id}'}
                            renderItem={renderItem}
                            contentContainerStyle={{
                                paddingTop: 10,
                                paddingBottom: 5,
                                width: wp('90%'),
                            }}
                            // ListEmptyComponent={<View style={{width:15}}></View>}
                        /> 
                    </SafeAreaView>
                </View>
                <Bottom navigation={props.navigation} home/>
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
        paddingHorizontal: wp('0%'),
        paddingBottom: 30,
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
        borderRadius: 10,
        paddingBottom: 5,
        paddingHorizontal: 0,
        width: '49%',
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
        // alignItems: 'center',
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