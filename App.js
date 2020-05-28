import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Loader from './src/components/Loader';

import BottomTabNavigator from './src/components/BottomTabNavigator';

import DeliveryppService from './src/services/DeliveryppService';

import Deliverypp from './src/Deliverypp';

const Stack = createStackNavigator();

const mainColor = '#fc0352';
const secondColor = '#f7457e';


const App = () => {

  let [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [total, setTotal] = useState(0);

  const onLogout = () => {
    setIsLoggedIn(false);
  }

  useEffect(() => {

    DeliveryppService.getLocalUserData().then(user => {

      Alert.alert('user: ' + JSON.stringify(user));

      if(user) {
        Deliverypp.user = user;
      }

      setIsLoggedIn(false);
      setLoading(false);
    }).catch(err => {
      setIsLoggedIn(false);
      setLoading(false);
    });

  });

  const onLogin = () => {
    Alert.alert("on login")
  }

  if(loading) {
    return <Loader color={mainColor} loading={loading} />
  }

  /*if(!isLoggedIn) {
    return <SignUpLoginFormsTab color={mainColor} />;
  }*/

  return (
    <BottomTabNavigator onLogout={onLogout} onLogin={onLogin} />
  );
};


export default App;
