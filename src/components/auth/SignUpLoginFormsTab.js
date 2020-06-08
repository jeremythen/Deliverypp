import React, { useState, useContext } from 'react';
import {  Dimensions, Alert, View, Text } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

import SignUp from './SignUp';
import SignIn from './SignIn';

import AuthService from '../../services/AuthService';

function SignUpLoginFormsTab(props) {

    const [index, setIndex] = useState(0);
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

    const onLoginSubmit = userCredentials => {

        AuthService.login(userCredentials)
                        .then(res => {
                            if(res.error) return Alert.alert('Hubo un error. Usuario o contraseña incorrectos.');
                            props.onLogin(res.user);
                        }).catch(err => {
                            Alert.alert('Hubo un error. Inténtelo más tarde. ' + JSON.stringify(err));
                        });

    }

    const conSignupSubmit = userInformation => {
        AuthService.register(userInformation)
                        .then(res => {
                            if(res.error) return Alert.alert('Hubo un error. Inténtelo más tarde.');
                            props.onSignup(res.user);
                        }).catch(err => {
                            Alert.alert('Hubo un error. Inténtelo más tarde.');
                        });
    }

    const renderScene = ({route}) => {
        switch(route.key) {
            case 'first':
                return (
                    <SignIn onSubmit={onLoginSubmit} color={props.color} />
                );
            case 'second':
                return <SignUp onSubmit={conSignupSubmit} color={props.color} />
            default:
                return null;
        }
    };

    return (

        <TabView
            navigationState={{ index, routes }}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            //initialLayout={initialLayout}
            renderScene={renderScene}
        />

    );

}


export default SignUpLoginFormsTab;