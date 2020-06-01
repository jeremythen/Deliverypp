import React, { useState } from 'react';
import {View, StyleSheet, Alert, TouchableHighlight, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';

function SignUp(props) {

    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [telephone, setTelephone] = useState('');
    const [name, setName] = useState('');

    const [emailError, setEmailError] = useState('');
    const [usernameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [telephoneError, setTelephoneError] = useState('');
    
    const [isDirty, setIsDirty] = useState(false);

    const onNameChange = (name) => {

        if(!isDirty) {
            setIsDirty(true);
        }

        if(!name) {
            setNameError('Introduzca su nombre.');
        } else {
            setNameError('');
        }
        setName(name);
    };

    const onTelephoneChange = (telephone) => {

        if(!isDirty) {
            setIsDirty(true);
        }

        if(!telephone) {
            setTelephoneError('Introduzca su teléfono.');
        } else {
            setTelephoneError('');
        }
        setTelephone(telephone);
    };

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

    const onUserNameChange = (username) => {

        if(!isDirty) {
            setIsDirty(true);
        }

        if(!username) {
            setUserNameError('Introduzca un nombre de usuario');
        } else {
            setUserNameError('');
        }
        setUserName(username);
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

        if(!username) {
            setUserNameError('Introduzca un nombre de usuario');
            valid = false;
        }

        if(!password) {
            setPasswordError('Introduzca una contraseña');
            valid = false;
        }

        if(!name) {
            setPasswordError('Introduzca su nombre.');
            valid = false;
        }

        if(!telephone) {
            setPasswordError('Introduzca su teléfono.');
            valid = false;
        }

        return valid;

    }

    const getData = () => {
        const userInfo = {
            username,
            password,
            email,
            telephone,
            name
        }
        return userInfo;
    }

    const submit = () => {

        if(isValid()) {
            props.onSubmit(getData());
        } else {
            Alert.alert("Todos los campos son requeridos.");
        }

    };

  return (
    <View style={styles.container}>

        <Input
            containerStyle={styles.inputContainerStyle}
            value={email}
            onChangeText={onEmailChange}
            placeholder="Email"
            leftIcon={<Icon name="envelope" size={24} color={props.color} />}
            errorMessage={emailError}
            label="Email"
        />

        <Input
            containerStyle={styles.inputContainerStyle}
            value={name}
            onChangeText={onNameChange}
            placeholder="Nombre"
            leftIcon={<Icon name="user" size={24} color={props.color} />}
            errorMessage={nameError}
            label="Nombre"
        />

        <Input
            containerStyle={styles.inputContainerStyle}
            value={telephone}
            onChangeText={onTelephoneChange}
            placeholder="Teléfono"
            leftIcon={<Icon name="phone" size={24} color={props.color} />}
            errorMessage={telephoneError}
            label="Teléfono"
        />

        <Input
            containerStyle={styles.inputContainerStyle}
            placeholder="Nombre de Usuario"
            value={username}
            onChangeText={onUserNameChange}
            leftIcon={<Icon name="user" size={24} color={props.color} />}
            errorMessage={usernameError}
            label="Usuario"
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
            label="Contraseña"
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
    },
    inputContainerStyle: {
        marginBottom: 12
    }
});


export default SignUp;
