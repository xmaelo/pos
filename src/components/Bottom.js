import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableHighlight, StyleSheet, TouchableOpacity, Image, SafeAreaView, Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {themes} from '../themes' 
import { user, save, archive, home, login, exit, ok } from '../assets'

import { request_post, request_get, onLogin } from '../config';
import { useDispatch, useSelector } from 'react-redux';
import RNPrint from 'react-native-print';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';


const colors = themes.colors

export default function Bottom(props){

    const socket = useSelector(p => p.socket)
    const tables  = useSelector(p =>p.tables)
    const user  = useSelector(p =>p.user)
    const cart  = useSelector(p =>p.cart)

    const dispatch = useDispatch()

    function onValidate(){
        const obx = props.obx()
        if(obx&&!obx.selects || obx&&obx.selects&&obx.selects.length == 0) return Alert.alert('Vous devez selectionner les elements de la commande !')
        console.log('obx *******************', obx)
        props.navigation.navigate("ValidateOrder", {obx: obx})
    }

    function renderSinglePrice(order){
        let sPrice = 0
        const object =  order.object ? JSON.parse(order.object) : {}
        order.consommabes&&order.consommabes.map((c, i) =>  sPrice = sPrice + (object[c.id] ? parseInt(object[c.id]) : 1) * parseFloat(c.price))
        return sPrice
      }


    async function printHTML(order) {
        console.log('order order', order.table)
        const object =  order.object ? JSON.parse(order.object) : {}

        let price = 0;
        order.consommabes.map(s => {
            price = price + (isNaN(parseInt(s.quantity))? 1 : parseInt(s.quantity)) * s.price
        })
        
        await RNPrint.print({
          html: `
          <div id="print-me">
          <div style="padding: 10px">
              <h3 style="text-align: center">GROUPE HOTELIER RAPHIA</h3>
              <br/>
              Table: `+props.table+ `<br/>
              Date: `+(order.time?.split('T')[0])+`<br/>
              Servir par: `+user.name+`<br/>
              Facture No: `+order['id']+`<br/>
              <hr style={{border: "none",
                  borderTop: "3px double #333",
                  color: "#333",
                  overflow: "visible",
                  textAlign: "center",
                  height: "5px"}}
                  />
              <br/>
              <h4>Consommables:</h4>
              <p style="marginTop: 5px">
                `+(order.consommabes&&order.consommabes.map((c, i) => 
                `<div key={c.id}> <span >`+c.name+`</span>`+
                `<span style="float: right">`+(object[c.id] ? object[c.id] : '1')+" X "+c.price+ " FCFA" +`</span>
                  </div>
                  `
                  ))+
                  `
              </p>
              <hr style={{border: "none",
                  borderTop: "3px double #333",
                  color: "#333",
                  overflow: "visible",
                  textAlign: "center",
                  height: "5px"}}
              />
              <p style="marginTop: 5px">
                <span style="float: right">`+(order.quantity? order.quantity : 1)+" X "+renderSinglePrice(order)+ " FCFA" +`</span>
              </p>
              <br/>
              <br/>
              Total: `+order.price+` FCFA
          </div>
      </div>
          `
        })
    }

    async function onSaveCommande(){
        try {
            let obx = props.obx() 
            
            console.log('obx obx obx', obx)
            //return
            if(obx&& !obx.table) return Alert.alert('Vous devez selectionner la table !')
          dispatch({type: "LOANDING"})

          const result = await request_post("commandes", obx)
          console.log('obx after pos ****************', result)
          const r = await socket.send(JSON.stringify(obx));
          dispatch({type: "LOANDING"})
          dispatch({type: "CART", data: []})
          props.navigation.navigate("Home")
          //printHTML(result)
        } catch (error) {
            console.log('error saving', error)
            dispatch({type: "LOANDING"})
        }
    }

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@auth', jsonValue)
        } catch (e) {
          // saving error
          console.log('error async storage', e)
        }
      }

    async function onConnect(){
        try {
            const res = await onLogin(props.credentials())

            if(res){
                return props.navigation.navigate("Home")
            }else{
                Alert.alert('Problème de connexion !')
            }
        } catch (error) {
            Alert.alert('Problème de connexion !')
            dispatch({type: "LOANDING"})
            console.log('error login', error)
        }
    }
    
    const createThreeButtonAlert = () =>
        Alert.alert(
        "Deconnexion",
        "Voulez-vous vous deconnecter ?",
        [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "OK", onPress: () => onExit() }
        ]
    );

    async function onExit(){
        try{
            props.navigation.navigate('Welcome')
            await storeData(null)

        }catch(e){
            console.log('errror loagout', e)
        }
    }
    async function onNewOrder(){
        if(cart.length ===0) return Alert.alert('Rien dans le panier !')
        props.navigation.navigate("NewOrder")
        
    }
    return (
        <View style={styles.Bottom}>
                <TouchableOpacity onPress={() =>props.navigation.navigate("Order")} >
                    <Image source={home} style={{width: 20, height: 20, opacity: !props.login? 1: 0}} />
                </TouchableOpacity>
                {props.home ?
                    <TouchableOpacity onPress={() =>onNewOrder()} >
                        <Image source={ok} style={{width: 90, height: 90, marginTop: -40}} />
                    </TouchableOpacity>
                    : props.order ?
                    
                    <TouchableOpacity onPress={() =>onValidate()} >
                        <Image source={archive} style={{width: 90, height: 90, marginTop: -40}} />
                    </TouchableOpacity> :
                    props.validation ?
                    <TouchableOpacity onPress={() =>onSaveCommande()} >
                        <Image source={archive} style={{width: 90, height: 90, marginTop: -40}} />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={() =>onConnect()} >
                        <Image source={login} style={{width: 90, height: 90, marginTop: -40}} />
                    </TouchableOpacity>

                }
                {!props.login && (props.print ?
                    <TouchableOpacity onPress={() =>Alert.alert('imprime la facture')} >
                        {/* <Image source={save} style={{width: 20, height: 20}} /> */}
                    </TouchableOpacity>
                     :
                    <TouchableOpacity onPress={() =>createThreeButtonAlert()} >
                        <Image source={exit} style={{width: 20, height: 20}} />
                    </TouchableOpacity>
                )}

                {
                    props.login && <View/>
                }
        </View>
    )
}

const styles = StyleSheet.create({
    Bottom: {
        // position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingTop: 20,
        // marginTop: 10,
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