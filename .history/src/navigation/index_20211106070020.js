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

  /************* SCREEN IMPORT ***************/
import Welcome from '../screens/Welcome'









const Stack = createStackNavigator();


const stacks = [
  { comp: Welcome, name: "Welcome" },
  // { comp: Drawers1, name: "Drawers1", join: true},
];


function _NAV_(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState({});
  const [initialRoute, setInitalRoute] = useState("Welcome");


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