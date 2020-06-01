import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Button
  } from 'react-native';

  import {Input} from 'react-native-elements';

  import AuthService from '../services/AuthService';

class ProfileScreen extends React.Component {

    logOut() {
        AuthService.removeLocalUser();
        this.props.onLogout();  
    }

    render() {  
        return (
            <View style={styles.tabContainer}>

                <Input
                    containerStyle={styles.inputContainerStyle}
                    value={this.props.user.username}
                    //onChangeText={onEmailChange}
                    placeholder="Usuario"
                    //leftIcon={<Icon name="user" size={24} color={props.color} />}
                    //errorMessage={emailError}
                    label="Usuario"
                />

                <Text>Profile Screen</Text>
                <Button onPress={() => this.logOut()} title="Logout"/>
            </View>  
        );  
    }  
}

const styles = StyleSheet.create({
    tabContainer: {  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center'  
    },
    inputContainerStyle: {
        marginBottom: 12
    }
});


export default ProfileScreen;
