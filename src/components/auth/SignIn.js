import React, { useState } from 'react';
import { Button, View, StyleSheet, Alert, TouchableHighlight, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';


function SignIn(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const onUserNameChange = (userName) => {
        if(!userName) {
            setUserNameError('Introduzca un nombre de usuario');
        } else {
            setUserNameError('');
        }
        setUserName(userName);
    };

    const onPasswordChange = (password) => {
        if(!password) {
            setPasswordError('Introduzca una contraseña');
        } else {
            setPasswordError('');
        }
        setPassword(password);
    };

  return (
    <View style={styles.container}>

        <Input
            placeholder="Nombre de Usuario"
            value={userName}
            onChangeText={onUserNameChange}
            leftIcon={<Icon name="user" size={24} color={props.color} />}
            errorMessage={userNameError}
            style={{marginBottom: 10}}
        />

        <Input
            placeholder="Contraseña"
            secureTextEntry={true}
            value={password}
            onChangeText={onPasswordChange}
            textContentType="newPassword"
            leftIcon={<Icon name="lock" size={24} color={props.color} />}
            errorMessage={passwordError}
            style={{marginBottom: 10}}
        />

        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => props.onLogin}
            style={{backgroundColor: props.color, marginTop: 15, borderRadius: 5 }}
        >
            <Text style={styles.button}>{'Entrar'}</Text>
        </TouchableHighlight>


    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    button: {
        alignItems: "center",
        padding: 10,
        color: 'white',
        width: 150,
        textAlign: 'center'
       
      }
});

export default SignIn;
