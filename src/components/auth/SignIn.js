import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableHighlight, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';


function SignIn(props) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const onUserNameChange = (username) => {
        if(!username) {
            setUserNameError('Introduzca un nombre de usuario');
        } else {
            setUserNameError('');
        }
        setUserName(username);
    };

    const onPasswordChange = (password) => {
        if(!password) {
            setPasswordError('Introduzca una contraseña');
        } else {
            setPasswordError('');
        }
        setPassword(password);
    };

    const isValid = () => {
        return username && password;
    }

    const submit = () => {

        if(isValid()) {

            const user = {
                username,
                password
            }

            props.onSubmit(user);

        } else {
            setPasswordError('Introduzca su contraseña');
            setUserNameError('Introduzca un nombre de usuario');
            Alert.alert("Todos los campos son requeridos.");
        }

    };

  return (
    <View style={styles.container}>

        <Input
            containerStyle={styles.inputContainerStyle}
            placeholder="Nombre de Usuario"
            value={username}
            onChangeText={onUserNameChange}
            leftIcon={<Icon name="user" size={24} color={props.color} />}
            errorMessage={usernameError}
            style={{marginBottom: 10}}
        />

        <Input
            containerStyle={styles.inputContainerStyle}
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
            onPress={submit}
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
      },
      inputContainerStyle: {
          marginBottom: 12
      }
});

export default SignIn;
