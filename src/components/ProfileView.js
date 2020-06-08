import React from 'react';

import {View, StyleSheet} from 'react-native';

import { Input } from 'react-native-elements';

import AuthService from '../services/AuthService';

function ProfileScreen(props) {
  const logOut = () => {
    AuthService.removeLocalUser();
    props.onLogout();
  };

  return (
    <View style={styles.tabContainer}>

      <Input
        containerStyle={styles.inputContainerStyle}
        value={props.user.username}
        disabled
        placeholder="Usuario"
        label="Usuario"
      />

      <Input
        containerStyle={styles.inputContainerStyle}
        value={props.user.name}
        disabled
        placeholder="Nombre"
        label="Nombre"
      />

      <Input
        containerStyle={styles.inputContainerStyle}
        value={props.user.lastName}
        disabled
        placeholder="Apellido"
        label="Apellido"
      />

      <Input
        containerStyle={styles.inputContainerStyle}
        value={props.user.email}
        disabled
        placeholder="Email"
        label="Email"
      />

      <Input
        containerStyle={styles.inputContainerStyle}
        value={props.user.telephone}
        disabled
        placeholder="Telefono"
        label="Telefono"
      />

    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainerStyle: {
    marginBottom: 12,
  },
});

export default ProfileScreen;
