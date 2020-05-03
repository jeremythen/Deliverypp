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

import Loader from './src/components/Loader';

import AddSubscription from './src/components/payment/AddSubscriptionScreen';

import Main from './src/components/Main';

import ConfirmOrderView from './src/components/payment/ConfirmOrderView';

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

  if(!isLoggedIn) {
    return <SignUpLoginFormsTab color={mainColor} />;
  }

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator style={styles.container}>

        <Stack.Screen
          name="Main"
          options={{title: 'Deliverypp', headerTintColor: mainColor}}
        >
          {
            props => <Main color={mainColor} {...props} />
          }
        </Stack.Screen>

        <Stack.Screen style={styles.container}
          name="AvailableProductsView"
          options={{title: 'Deliverypp', headerTintColor: mainColor}}
          initialParams={{color: mainColor}}
        >
          {
            props => <AvailableProductsView color={mainColor} {...props} />
          }
        </Stack.Screen>

        <Stack.Screen
          name="LocationMap"
          options={{title: 'Selecciona El Destino', headerTintColor: mainColor}}
        >
          {
            props => <LocationMap color={mainColor} {...props} total={500} />
          }
        </Stack.Screen>

        <Stack.Screen
          name="ConfirmOrderView"
          options={{title: 'Confirmar Orden', headerTintColor: mainColor}}
        >
          {
            props => <ConfirmOrderView {...props} color={mainColor} secondColor={secondColor} />
          }
        </Stack.Screen>

        <Stack.Screen
          name="MakePayment"
          options={{title: 'Agregar Método De Pago', headerTintColor: mainColor}}
        >
          {
            props => <AddSubscription {...props} />
          }
        </Stack.Screen>
      
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
