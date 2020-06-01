
import 'react-native-gesture-handler';

import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert
} from 'react-native';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/Ionicons';  

import { Icon as EIcon, Badge } from 'react-native-elements';

import { createAppContainer} from 'react-navigation';

import ProductFlowView from './ProductFlowView';

import ProfileView from './ProfileView';
import PaymentMethodView from './PaymentMethodView';
import CartScreen from './CartScreen';

import SignUpLoginFormsTab from './auth/SignUpLoginFormsTab';

import Deliverypp from '../Deliverypp';

import UserContext from './context/UserContext';

const mainColor = Deliverypp.mainColor;

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
        Profile: { screen: screenProps => (
                <UserContext.Consumer>
                    {
                        context => (

                            context.isLoggedIn ? <ProfileView {...context} /> : <SignUpLoginFormsTab {...context} color={mainColor} />
                        )
                    }
                </UserContext.Consumer>
                
        ), 
            navigationOptions:{  
                tabBarLabel:'Profile',
                title: 'Profile',
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
            screen: () => CartScreen,  
            navigationOptions:{  
                tabBarLabel:'Cart',  
                tabBarIcon: (props) => ( 
                    <CartIcon color={props.tintColor} p={props}/>
                )

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

  function CartIcon(props) {
      return (
        <View>
            <EIcon
                name='shopping-cart'
                type='font-awesome'
                color={props.color}
                size={25}
                //onPress={() => props.setModalVisible(true)}
            />
            <Badge
                status="success"
                containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                value={1}  
            />
        </View>
      )
  }
  
  const WrappedTabNavigator = createAppContainer(TabNavigator);

  export default WrappedTabNavigator;