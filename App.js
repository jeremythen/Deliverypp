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
    <BottomTabNavigator onLogout={onLogout}/>
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
