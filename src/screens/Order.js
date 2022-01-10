import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, Alert, FlatList, ImageBackground, Image, TouchableWithoutFeedback} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {themes} from '../themes' 
import { background, thumbIcon, dg } from '../assets'
import SwipeButton from 'rn-swipe-button';
import  Head  from '../components/Header'
import  Bottom  from '../components/Bottom'
import {Picker} from '@react-native-picker/picker';
import { Switch } from 'react-native-paper';
import { request_get, request_post, imageBase, request_patch } from '../config';
import { useDispatch, useSelector } from 'react-redux';
import { List } from 'react-native-paper';
import { Button } from 'react-native-paper';


export default function Order(props){

    const [orders, setOrders] = React.useState([])
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);
    const username  = useSelector(p => p.user?.username)
    const dispatch = useDispatch()

    const socket = useSelector(p =>p.socket)

    React.useEffect(()=>{
        (async()=>{
            
            onGetOrder()
        })()
    }, [])

    async function onGetOrder(){
        console.log('username username username', username)
        dispatch({type: "LOANDING"})
        try {
          const result =  await request_get('commandes?order[id]=desc&time[after]='+new Date().toISOString().split('T')[0]+'&encaisse=false&user.username='+username)
          if(result&&result['hydra:member']&&result['hydra:member'].length > 0){
           // dispatch({type: 'CMD', orders: result['hydra:member']})
           console.log("result['hydra:member']", result['hydra:member'])
           setOrders(result['hydra:member'])
          }
        } catch (error) {
          console.log('onLoadTyeOnWait', error)
        }
        dispatch({type: "LOANDING"})
    
      }

      async function onLoadTask(task){
        try {
          const result =  await request_get('order_states?page=1&task_name='+task)
          if(result&&result['hydra:member']&&result['hydra:member'].length > 0){
            return result['hydra:member'][0]
          }
        } catch (error) {
          console.log('onLoadTyeOnWait', error)
        }
      }

      const alert = () => Alert.alert(
        "Avertissement !",
        "Vous devez servir uniquement les commandes validé par le caissier"
      );

      async function onServie(order){
        if(order.status && order.status.task_name !== "valide"){
            return alert()
        }
        dispatch({type: "LOANDING"})
        try {
          const task = await onLoadTask("servie")
          const res = await request_patch("commandes/"+order.id, {status: task['@id'], task: task.task_name})
          await socket.send(JSON.stringify(res))
          console.log('res res res patch', res)
          await onGetOrder()
        } catch (error) {
          console.log('error cathing', error)
        }
        dispatch({type: "LOANDING"})
      }

      const renderItem = ({item, index}) => {
        const object = JSON.parse(item.object)
        return (
            <List.Accordion
                title={"No. "+item.id+" - To. "+item.table_.name+" - "+item.price+' fcfa'+" ("+item.status.name+")"}
                style={{width: wp('90%')}}
                //left={props => <List.Icon {...props} icon="folder" />}
            >
                    <View style={{backgroundColor: 'white', paddingBottom: 10}}>
                        {item.consommabes&&item.consommabes.map((c, i) =>
                            <List.Item title={(object[c.id] ? object[c.id] : '1')+" X "+ c.name} key={i}/>
                        )}
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Button style={{width: 200}} icon="food-fork-drink" mode="outlined" onPress={() => onServie(item)}>
                                Servie
                            </Button>
                        </View>
                        
                    </View>
            </List.Accordion>
        )
    }

    
    return(

        <View style={styles.container}>
            <View style={styles.container}>
                <Head navigation={props.navigation} goBack logo menu/>
                <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                    <View style={styles.content}>
                        <Text style={styles.Title}>Commandes</Text>

                        <SafeAreaView style={styles.containers}>
                            

                            <FlatList
                                data={orders.filter(a => !a.encaisse)}
                                showsHorizontalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                persistentScrollbar={false}
                                
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
        paddingHorizontal: wp('3%'),
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