import React, { useState }  from 'react';

import { View, StyleSheet, Dimensions, Text } from 'react-native';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LocationMap from './LocationMap';

import AvailableProductsView from './products/AvailableProductsView';

import AddSubscription from './payment/AddSubscriptionScreen';

import Main from './Main';

import ConfirmOrderView from './payment/ConfirmOrderView';

import { TabView, TabBar } from 'react-native-tab-view';


const Stack = createStackNavigator();

const mainColor = '#fc0352';
const secondColor = '#f7457e';

function ProductFlowView(props) {
    return (
        <ProductsOrdersTabs />
    );
}

function Products(props) {
    return (
        <NavigationContainer style={styles.container}>
            <Stack.Navigator style={styles.container}>
        
                <Stack.Screen
                name="Main"
                options={{title: '', headerTintColor: mainColor}}
                >
                {
                    props => <Main color={mainColor} {...props} />
                }
                </Stack.Screen>
        
                <Stack.Screen style={styles.container}
                name="AvailableProductsView"
                options={{title: '', headerTintColor: mainColor}}
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
    )
}

function Orders(props) {
    return (
        <View>
            <Text>In Orders</Text>
        </View>
    )
}


function ProductsOrdersTabs(props) {

    const [index, setIndex] = useState(0);
    const initialLayout = { width: Dimensions.get('window').width };

    const [routes] = React.useState([
        { key: 'first', title: 'Productos' },
        { key: 'second', title: 'Órdenes' },
      ]);

    const renderTabBar = tabBarProps => (
    <TabBar
        {...tabBarProps}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: mainColor }}
    />
    );

    const renderScene = ({route}) => {
        switch(route.key) {
            case 'first':
                return <Products color={mainColor} />;
            case 'second':
                return <Orders color={mainColor} />
            default:
                return null;
        }
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderScene={renderScene}
        />
    );

}


const styles = StyleSheet.create({
container: {
    margin: 0,
    padding: 0
}
});

export default ProductFlowView;