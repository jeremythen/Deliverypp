
import 'react-native-gesture-handler';

import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/Ionicons';  

import { createAppContainer} from 'react-navigation';

import ProductFlowView from './ProductFlowView';

import ProfileScreen from './ProfileScreen';
import PaymentMethodView from './PaymentMethodView';
import CartScreen from './CartScreen';

const TabNavigator = createMaterialBottomTabNavigator(
    {  
        Home: { screen: ProductFlowView,  
            navigationOptions:{  
                tabBarLabel:'Home',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>  
                    </View>),  
            }  
        },  
        Profile: { screen: ProfileScreen,  
            navigationOptions:{  
                tabBarLabel:'Profile',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-person'}/>  
                    </View>),  

            }  
        },  
        Image: { screen: PaymentMethodView,  
            navigationOptions:{  
                tabBarLabel:'Método de pago',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-card'}/>  
                    </View>),  
            }  
        },  
        Cart: {  
            screen: CartScreen,  
            navigationOptions:{  
                tabBarLabel:'Cart',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-cart'}/>  
                    </View>),  
            }  
        },  
    },  
    {  
      initialRouteName: "Home",  
      activeColor: '#fc0352',  
      inactiveColor: '#f56492',  
      barStyle: { backgroundColor: '#f0edf6' },
    },  
  );  
  
  const styles = StyleSheet.create({
    container: {
      margin: 0,
      padding: 0
    },
    tabContainer: {  
      flex: 1,  
      justifyContent: 'center',  
      alignItems: 'center'  
    },  
  });
  
  const WrappedTabNavigator = createAppContainer(TabNavigator);

  export default WrappedTabNavigator;