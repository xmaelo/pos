import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, FlatList, Animated, ImageBackground, Image, TouchableWithoutFeedback, Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {themes} from '../themes' 
import { background, thumbIcon, dg, arrow } from '../assets'
import SwipeButton from 'rn-swipe-button';
import  Head  from '../components/Header'
import  Bottom  from '../components/Bottom'
import {Picker} from '@react-native-picker/picker';
import { Button, Surface, Provider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import SwipeToChoice from 'react-native-swipe-to-choice';
import { useDispatch, useSelector } from 'react-redux';
import { imageBase, request_get } from '../config';

const colors = themes.colors




function Drop(props) {

    const menus = useSelector(p =>{
        const t = [
            {
                label: 'Repas', 
                value: 'repas',
            },
            {
                label: 'Dessert', 
                value: 'dessert',
            },
            {
                label: 'Boisson', 
                value: 'boisson',
            },
        ]

        return t.concat(p.consommables.map(c => { 
            return {
                parent: c.typeConsommable?.task_name, 
                label: c.name, 
                value: c, 
                icon: () => <Image source={{uri: imageBase+c.picture}} style={styles.iconStyle} />,
                ...c
            }
        }))
    })

    const dispatch = useDispatch()

    const setItems = (items) =>{

    }

    React.useEffect(()=>{
        (async()=>{
            // onReload()
        })()
    }, [])


    // const [items, setItems] = useState([
    //     {
    //       label: 'Repas', 
    //       value: 'repas',
    //     },
    //     {
    //       label: 'Riz', 
    //       value: 'riz',
    //       parent: 'repas',
    //       icon: () => <Image source={dg} style={styles.iconStyle} />
    //     },
    //     {
    //       label: 'Banana', 
    //       value: 'banana',
    //       parent: 'repas',
    //       icon: () => <Image source={dg} style={styles.iconStyle} />
    //     },
    //     {
    //       label: 'Banana2', 
    //       value: 'banana2',
    //       parent: 'repas',
    //       icon: () => <Image source={dg} style={styles.iconStyle} />
    //     },
    //     {
    //       label: 'Banana3', 
    //       value: 'banana3',
    //       parent: 'repas',
    //       icon: () => <Image source={dg} style={styles.iconStyle} />
    //     },
    //     {
    //         label: 'Dessert', 
    //         value: 'dessert',
    //     },
    //     {
    //         label: 'Pasteque', 
    //         value: 'pasteque',
    //         parent: 'dessert',
    //         icon: () => <Image source={dg} style={styles.iconStyle} />
    //     },
    //     {
    //         label: 'Orange', 
    //         value: 'orange',
    //         parent: 'dessert',
    //         icon: () => <Image source={dg} style={styles.iconStyle} />
    //     },
    //     {
    //         label: 'Boisson', 
    //         value: 'boisson',
    //     },
    //     {
    //         label: '33', 
    //         value: '33',
    //         parent: 'boisson',
    //         icon: () => <Image source={dg} style={styles.iconStyle} />
    //     },
    //     {
    //         label: 'Jus', 
    //         value: 'jus',
    //         parent: 'boisson',
    //         icon: () => <Image source={dg} style={styles.iconStyle} />
    //     },
    // ]);
  
    return (
      <DropDownPicker
        open={props.open}
        value={props.value}
        items={menus}
        searchable={true}
        mode="BADGE"
        categorySelectable={false}
        placeholder={props.placholder}
        searchPlaceholder="Recherche..."
        setOpen={props.setOpen}
        setValue={props.setValue}
        setItems={setItems}
        multiple={true}
        style={{
            width: wp('94%')
          }}
      />
    );
  }
export default function NewOrder(props){

    const scrollY = React.useRef(new Animated.Value(0)).current;
    const [repas, setRepas] = useState([]);
    const [openRepas, setOpenRepas] = useState(false);
    const [objQ, setObjq] = React.useState({});
    const [status, setStatus] = React.useState(null);


    const [showRepas, onRepas] = useState(false);

    console.log('repas **********************', repas)

    React.useEffect(function(){
        onLoadTyeOnWait()
      }, [])

    async function onLoadTyeOnWait(){
        try {
          const result =  await request_get('order_states?page=1&task_name=en_attente')
          if(result&&result['hydra:member']&&result['hydra:member'].length > 0){
            setStatus(result['hydra:member'][0])
          }
        } catch (error) {
          console.log('onLoadTyeOnWait', error)
        }
      }

    function onCalculCommande(){
          console.log('started saving', objQ, JSON.stringify(objQ))
          
          const now = new Date()
          const obx = {
            //   table: table,
              consommabes: repas.map(c => c['@id']),
              selects: repas,
              status: status && status['@id'],
              time: new Date().toISOString(),
              random: Math.floor(Math.random() * 5000)+"_"+now.getTime(),
            //   quantity: parseInt(plateQuantity),
            //   price: renderPrice(),
              task: status.task_name,
              object: JSON.stringify(objQ)
          }
        //   setDisabled(true)
    
          console.log('obx after pos ****************', obx)
          return obx
        //   const result = await request_post("commandes", obx)
        //   const r = await socket.send(JSON.stringify(obx));
          //await dispatch({type: "NEW_ORDER", random: obx.random})
        //   await onOrder(obx)
        //   setDisabled(false)
          
        //   handleClose()
      }

    function onUpQuantity(item){
        setRepas(repas.map(r =>{
            if(r.id === item.id) return {...r, quantity: r.quantity  ? r.quantity+1 : 2}
            return {...r}
        }))

        const v = objQ
        v[item.id] = v[item.id] ? v[item.id] + 1 : 1
        setObjq(v)
    }
    function onReduseQuantity(item){
        setRepas(repas.map(r =>{
            if(r.id === item.id) return {...r, quantity: r.quantity && r.quantity >1  ? r.quantity-1 : 1}
            return {...r}
        }))
        const v = objQ
        v[item.id] = v[item.id] && v[item.id] > 1 ? v[item.id] - 1 : 1
        setObjq(v)
    }
    const renderItem = ({item, index}) => {
        
        return (
            <View style={{paddingVertical: 5}}>
                <SwipeToChoice
                    onPressRight={() => onUpQuantity(item)}
                    onPressLeft={() => onReduseQuantity(item)}
                    activeSwipeChoose={false}
                    buttonLeft={
                        <View
                            style={{
                            flex: 1,
                            width: wp('10%'),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 100,
                            }}
                        >
                            
                            <Ionicons name="remove-circle" color={colors.primary} size={40} style={{backgroundColor: 'white', borderRadius: 100}}/>
                        </View>
                    }
                    buttonRight={
                        <View
                            style={{
                            flex: 1,
                            // width: wp('15%'),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 100,
                            
                            }}
                        >
                            <Ionicons name="add-circle" color={colors.primary} size={40} style={{backgroundColor: 'white', borderRadius: 100}}/>
                        </View>
                    }
                >
                    <Surface style={{...styles.surface, flexDirection: 'row', justifyContent: 'space-between', height: 80,}}>
                        <Image source={{uri: imageBase+item.picture}} style={styles.imageFood} />
                        <View style={{paddingLeft: 7}}>
                            <Text>{item.name}</Text>
                            <Text>{item.description?.slice(0, 20)+""+(item.description.length > 20 && " ...")} </Text>
                        </View>
                        <View>
                            <Text>Quantité: {item.quantity ? item.quantity : 1}</Text>
                            <Text style={{color: colors.primary}} >{item.price} FCFA</Text>
                        </View>
                    </Surface>
                </SwipeToChoice>
            </View>

        )
    }

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
                            uppercase={false}
                            //onPress={() => onRepas(true)}
                        >
                            Repas
                        </Button>
                        <Button 
                            icon={"food-fork-drink"} 
                            style={styles.but} 
                            mode="contained" 
                            uppercase={false}
                            //onPress={() => onBoisson(true)}
                            color={colors.primary} labelStyle={{color: 'white'}}
                        >
                            Boisson
                        </Button>
                        <Button 
                            icon="food-drumstick" 
                            style={styles.but} 
                            uppercase={false}
                            mode="contained" 
                            //onPress={() => console.log('Pressed')}
                            color={colors.primary} labelStyle={{color: 'white'}}
                        >
                            Dessert
                        </Button>
                    </View>
                        <View style={{marginTop: 15}}>
                            <Drop 
                                placholder={"Selectionnez la commande"} 
                                open={openRepas} 
                                value={repas}
                                setOpen={setOpenRepas}
                                setValue={setRepas}
                            />
                        </View>

                        

                        <SafeAreaView style={styles.containers}>
                            <Animated.FlatList
                                data={repas}
                                // numColumns={2}
                                showsHorizontalScrollIndicator={false}
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
                                    width: wp('94%'),
                                }}
                                // ListEmptyComponent={<View style={{width:15}}></View>}
                            /> 
                        </SafeAreaView>
                </View>
                <Bottom navigation={props.navigation} order obx={onCalculCommande}/>
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
        // paddingHorizontal: wp('3%'),
        paddingBottom: 70,
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
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
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
        marginTop: 10,
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