import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, Animated, ImageBackground, Image, TouchableWithoutFeedback} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {themes} from '../themes' 
import { background, thumbIcon, dg } from '../assets'
import SwipeButton from 'rn-swipe-button';
import  Head  from '../components/Header'
import  Bottom  from '../components/Bottom'
import { Title } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import { Avatar, Button, Card, Paragraph } from 'react-native-paper';

const colors = themes.colors
const ITEM_MARGIN_BOTTOM = 8;
const ITEM_PADDING = 10;
//This is height of 1 item
const ITEM_SIZE = ITEM_PADDING * 8 + ITEM_MARGIN_BOTTOM;


export default function Home(props){
    const pickerRef = useRef();
    const scrollY = React.useRef(new Animated.Value(0)).current;

    function open() {
        pickerRef.current.focus();
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
                <TouchableWithoutFeedback
                    onPress={()=>{}}
                >
                    <View style={[styles.card, styles.shadowProp]}>
                        <View>
                            <Image source={dg} style={{width: '100%', height: 80}} />
                        </View>
                        <View style={{...styles.textCard}}>
                            <Text style={styles.head}>Poulet DG</Text>
                            <Text style={styles.desc}>Tomates, Pommes, et ..</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', ...styles.textCard}}>
                            <Text style={{...styles.head, color: colors.primary, fontSize: 12, fontWeight: 'bold'}}>
                                11.500 FCFA
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
        )
    }

    return (
        <View style={styles.container}>
            <Head navigation={props.navigation} goBack logo menu/>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.content}>
                    <Text style={styles.Title}>Nouvelle commande</Text>

                    <View style={styles.drop}>
                        <Picker
                            mode="dropdown"
                            ref={pickerRef}
                            selectedValue={"Java"}
                            // style={{ height: 50, width: 250, backgroundColor: 'white', borderRadius: 50 }}
                            // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                    </View>
                    <View style={styles.search}>
                        <Text style={styles.search2}>Liste de menu</Text>
                    </View>
                    <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Card.Content>
      <Title>Card title</Title>
      <Paragraph>Card content</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>

                    <SafeAreaView style={styles.containers}>
                        <Animated.FlatList
                            data={[{id: 1}, {id: 2}, {id: 2}]}
                            numColumns={2}
                            showsHorizontalScrollIndicator={false}
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
        width: '48%',
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