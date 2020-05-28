import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Button
  } from 'react-native';

  import AsyncStorage from '@react-native-community/async-storage';

class ProfileScreen extends React.Component { 

    logOut() {
        AsyncStorage.removeItem('@Deliverypp:jwtToken');
    }

    render() {  
        return (  
            <View style={styles.tabContainer}>  
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
    }
});
  

export default ProfileScreen;
