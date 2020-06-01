import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

import React, { useState, useEffect } from 'react';

import Loader from './src/components/Loader';

import BottomTabNavigator from './src/components/BottomTabNavigator';

import DeliveryppService from './src/services/DeliveryppService';

import Deliverypp from './src/Deliverypp';

import UserContext from './src/components/context/UserContext';

import { Alert } from 'react-native';

const mainColor = Deliverypp.mainColor;

const App = () => {

  let [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [order, setOrder] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {

    DeliveryppService.getLocalUserData().then(userJson => {

      if(userJson) {
        user = JSON.parse(userJson)
        setUser(user);
        setIsLoggedIn(user.isLoggedIn);
      }
      
      setLoading(false);
    }).catch(err => {
      setIsLoggedIn(false);
      setLoading(false);
    });

  }, [isLoggedIn]);

  const onLogin = () => {
    setIsLoggedIn(true);
  }

  const onSignup = () => {
    setIsLoggedIn(true);
  }

  const onOrderUpdate = order => {
    setOrder(order);
  }
  
  const onLogout = () => {
    setIsLoggedIn(false);
  }

  if(loading) {
    return <Loader color={mainColor} loading={loading} />
  }

  Alert.alert('isLoggedIn ' + isLoggedIn);
  Alert.alert('user ' + JSON.stringify(user));

  return (
    <UserContext.Provider value={{ onLogout, onLogin, onSignup, isLoggedIn, onOrderUpdate, user }} >
      <BottomTabNavigator />
    </UserContext.Provider>
  );
};


export default App;
