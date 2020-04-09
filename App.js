/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

import LocationMap from './src/components/LocationMap';

import AvailableProductsView from './src/components/products/AvailableProductsView';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator style={styles.container}>
        <Stack.Screen style={styles.container}
          name="Products"
          component={AvailableProductsView}
          options={{title: 'Deliverypp'}}
        />
        <Stack.Screen
          name="LocationMap"
          component={LocationMap}
          options={{title: 'Selecciona el destino'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0
  }
});

export default App;
