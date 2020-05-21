import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Geolocation from '@react-native-community/geolocation';

import LocationMap from './src/components/LocationMap';

import AvailableProductsView from './src/components/products/AvailableProductsView';

import SignUpLoginFormsTab from './src/components/auth/SignUpLoginFormsTab';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/Ionicons';  

import { createBottomTabNavigator, createAppContainer} from 'react-navigation';  

import Loader from './src/components/Loader';

import AddSubscription from './src/components/payment/AddSubscriptionScreen';

import Main from './src/components/Main';

import ConfirmOrderView from './src/components/payment/ConfirmOrderView';

import BottomTabNavigator from './src/components/BottomTabNavigator';

import ProductFlowView from './src/components/ProductFlowView';

const Stack = createStackNavigator();

const mainColor = '#fc0352';
const secondColor = '#f7457e';


const App = () => {

  let [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [total, setTotal] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem(
      '@Deliverypp:jwtToken',
        (err, data) => {
            if(err) {
              Alert.alert('Hubo un error. Trata más tarde');
              setIsLoggedIn(false);
            } else {
                setIsLoggedIn(!!data);
                setTimeout(() => setLoading(false), 1000);
            }
        }
    );
  });

  if(loading) {
    return <Loader color={mainColor} loading={loading} />
  }

  /*if(!isLoggedIn) {
    return <SignUpLoginFormsTab color={mainColor} />;
  }*/

  return (
    <BottomTabNavigator />
  );
};


//BottomTabNavigator


const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0
  }
});

export default App;
