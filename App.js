/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  Text,
} from 'react-native';


import LocationMap from './src/components/LocationMap';

const App = () => {
  return (
    <>
    <View>
        <LocationMap />
    </View>
    </>
  );
};

export default App;
