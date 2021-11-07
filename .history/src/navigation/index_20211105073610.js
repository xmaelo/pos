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