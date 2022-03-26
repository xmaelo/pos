import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './reducer'

import jwt_decode from "jwt-decode";
const url ="http://restau.gh-raphia.net/php-websocket-app/public/"
export const endpoint = url+"api/"
export const imageBase = url+"uploads/"

export const websocketUrl = "ws://restau.gh-raphia.net:3001"

// const url = "http://localhost:8000/"
// export const imageBase = url+"uploads/"
// export const endpoint = url+"api/"





function request_get1(path, header){

    const r = fetch(endpoint+path, {
         method: 'GET',
         headers: {
           'authorization': !header ? store.getState().header : header,
           'Content-Type': 'application/json'
      }
    }).then(
      (response) => response.json()
    ).then(
      (responseJson) => {
        return responseJson;
      }
    )
    return r;
}
export function request_delete(path, header){

    const r = fetch(endpoint+path, {
         method: 'DELETE',
         headers: {
           //'authorization': !header ? store.getState().header : header,
           'Content-Type': 'application/json'
      }
    }).then(
      (response) => true
    ).then(
      (responseJson) => {
        return responseJson;
      }
    )
    return r;
}

export const request_get = request_get1

  
export function request_post(path, body, header){
    const r = fetch(endpoint+path, {
         method: 'POST',
         headers: {
          'authorization': !header? 'Bearer '+store.getState().header : null,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(
      (response) => response.json()
    ).then(
      (responseJson) => {
        return responseJson;
      }
    )
    return r;
}

export function request_patch(path, body, header){
    const r = fetch(endpoint+path, {
         method: 'PATCH',
         headers: {
          //'authorization': !header? 'Bearer '+store.getState().header : null,
          'Content-Type': 'application/merge-patch+json'
      },
      body: JSON.stringify(body)
    }).then(
      (response) => response.json()
    ).then(
      (responseJson) => {
        return responseJson;
      }
    )
    return r;
}
  
export function request_post_with_picture(path, body, header){
    const r = fetch(endpoint+path, {
         method: 'POST',
         headers: {
          //'authorization': !header? 'Bearer '+store.getState().header : null,
      },
      body: body
    }).then(
      (response) => response.json()
    ).then(
      (responseJson) => {
        return responseJson;
      }
    )
    return r;
}

async function onOrder1(obx, header){
  try {
    const res = await request_get1('commandes?page=1&random='+obx.random, header)
    if(res&&res["hydra:member"]){
      //store.dispatch({type: "NEW_ORDER", order: res["hydra:member"][0]})
    }
  } catch (error) {
    console.log('error error error error error', error)
  }
}

export const onOrder = onOrder1

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@auth')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

const storeData = async (value) => {
  try {
    const jsonValue = value ? JSON.stringify(value) : null
    await AsyncStorage.setItem('@auth', jsonValue)
  } catch (e) {
    // saving error
    console.log('error async storage', e)
  }
} 

export async function onLogin(crendentials){
  try {
      store.dispatch({type: "LOANDING"})
      const res = await request_post("login", crendentials, true)

      const data = jwt_decode(res.token)
      console.log('first obx', res.token)
      store.dispatch({type: "SAVE_HEADER", token: "Bearer "+res.token})

      const users = await request_get("users?username="+data.username)
      
      console.log('users users users', users)

      if(users&&users['hydra:member']&&users['hydra:member'][0]){
        const user = users['hydra:member'][0]
        console.log('>>> result getUser', user)
        store.dispatch({type: "SAVE_USER", user: user})
        await storeData(crendentials)
        store.dispatch({type: "LOANDING", stop: true})
        return true
      }else{
        store.dispatch({type: "LOANDING", stop: true})
        return false
      }
  } catch (error) {
    console.log('error error onLogin', error)
    store.dispatch({type: "LOANDING", stop: true})
  }
}