import React, { useState }  from 'react';

import { View, StyleSheet, Dimensions, Text } from 'react-native';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LocationMap from './LocationMap';

import AvailableProductsView from './products/AvailableProductsView';

import ConfirmOrderView from './payment/ConfirmOrderView';

import { TabView, TabBar } from 'react-native-tab-view';

import ProductsCategoriesView from './products/ProductsCategoriesView';

import OrdersView from './orders/OrdersView';

import UserContext from './context/UserContext';

import ProfileView from './ProfileView';


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
                    name="ProductsCategoriesView"
                    options={{title: 'Categorías', headerTintColor: mainColor}}
                    >
                    {
                        props => <ProductsCategoriesView color={mainColor} {...props} />
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
                        props =>(
                            <UserContext.Consumer>
                                {
                                    context => (
                                        context.isLoggedIn ? <ConfirmOrderView {...props} color={mainColor} secondColor={secondColor} {...context} /> : <ProfileView {...context} />
                                    )
                                }
                            </UserContext.Consumer>
                            
                        )
                    }
                </Stack.Screen>
            
            </Stack.Navigator>
    
        </NavigationContainer>
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
                return <OrdersView color={mainColor} />
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