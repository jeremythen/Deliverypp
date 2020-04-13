import React, { useState, isValidElement } from 'react';
import {View, StyleSheet, Alert, TouchableHighlight, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';


function SignUp(props) {

    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const [isDirty, setIsDirty] = useState(false);

    const onEmailChange = (email) => {

        if(!isDirty) {
            setIsDirty(true);
        }

        if(!email) {
            setEmailError('Introduzca un email válido');
        } else {
            setEmailError('');
        }
        setEmail(email);
    };

    const onUserNameChange = (userName) => {

        if(!isDirty) {
            setIsDirty(true);
        }

        if(!userName) {
            setUserNameError('Introduzca un nombre de usuario');
        } else {
            setUserNameError('');
        }
        setUserName(userName);
    };

    const onPasswordChange = (password) => {

        if(!isDirty) {
            setIsDirty(true);
        }

        if(!password) {
            setPasswordError('Introduzca una contraseña');
        } else {
            setPasswordError('');
        }
        setPassword(password);
    };

    const isValid = () => {

        let valid = true;

        if(!email) {
            setEmailError('Introduzca un email válido');
            valid = false;
        }

        if(!userName) {
            setUserNameError('Introduzca un nombre de usuario');
            valid = false;
        }

        if(!password) {
            setPasswordError('Introduzca una contraseña');
            valid = false;
        }

        return valid;

    }

    const submit = () => {

        if(isValid()) {
            Alert.alert("Is valid.");
        } else {
            Alert.alert("Todos los campos son requeridos.");
        }

    };

  return (
    <View style={styles.container}>

        <Input
            value={email}
            onChangeText={onEmailChange}
            placeholder="Email"
            leftIcon={<Icon name="envelope" size={24} color={props.color} />}
            errorMessage={emailError}
        />

        <Input
            placeholder="Nombre de Usuario"
            value={userName}
            onChangeText={onUserNameChange}
            leftIcon={<Icon name="user" size={24} color={props.color} />}
            errorMessage={userNameError}
        />

        <Input
            placeholder="Contraseña"
            secureTextEntry={true}
            value={password}
            onChangeText={onPasswordChange}
            textContentType="newPassword"
            leftIcon={<Icon name="lock" size={24} color={props.color} />}
            errorMessage={passwordError}
        />

        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={submit}
            style={{backgroundColor: props.color, marginTop: 15, borderRadius: 5 }}
        >
            <Text style={styles.button}>Registrarse</Text>
        </TouchableHighlight>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        alignItems: "center",
        padding: 10,
        color: 'white',
        width: 150,
        textAlign: 'center'
      }
});


export default SignUp;
