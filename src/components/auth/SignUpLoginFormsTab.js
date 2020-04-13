import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Alert } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import SignUp from './SignUp';
import SignIn from './SignIn';

function SignUpLoginFormsTab(props) {

    //Alert.alert(props.color)

    const [index, setIndex] = useState(0);

    const initialLayout = { width: Dimensions.get('window').width };

    const [routes] = React.useState([
        { key: 'first', title: 'Entrar' },
        { key: 'second', title: 'Registrarse' },
      ]);

    const renderTabBar = tabBarProps => (
    <TabBar
        {...tabBarProps}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: props.color }}
    />
    );

    const renderScene = ({route}) => {
        switch(route.key) {
            case 'first':
                return <SignIn color={props.color} />;
            case 'second':
                return <SignUp color={props.color} />
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


export default SignUpLoginFormsTab;