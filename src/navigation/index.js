import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem, 
  } from '@react-navigation/drawer';

  import 'react-native-gesture-handler';
  import { NavigationContainer } from '@react-navigation/native';
  import { StyleSheet, View, Image, Text, TouchableOpacity, Linking } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import { createStackNavigator } from '@react-navigation/stack';
  import SplashScreen from 'react-native-splash-screen';
  /************* SCREEN IMPORT ***************/
import Welcome from '../screens/Welcome'
import Home from '../screens/Home'
import Login from '../screens/Login'
import NewOrder from '../screens/NewOrder'
import ValidateOrder from '../screens/ValidateOrder'









const Stack = createStackNavigator();


const stacks = [
  { comp: Welcome, name: "Welcome" },
  { comp: Home, name: "Home" },
  { comp: Login, name: "Login" },
  { comp: NewOrder, name: "NewOrder" },
  { comp: ValidateOrder, name: "ValidateOrder" },
  // { comp: Drawers1, name: "Drawers1", join: true},
];


export default function _NAV_(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState({});
  const [initialRoute, setInitalRoute] = useState("Welcome");

  React.useEffect(() => {    
      SplashScreen.hide();
  }, []);

  return (
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName={initialRoute}
            screenOptions={{
              presentation: 'modal',
              headerShown: false
            }}
          >
            {stacks.map((s, k)=>
              <Stack.Screen name={s.name} component={s.comp} key={k}/>
            )}
          </Stack.Navigator>
        </NavigationContainer>
  );
}