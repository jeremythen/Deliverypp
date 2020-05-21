import React from 'react';

import {
    View,
    Text,
    StyleSheet
  } from 'react-native';

class ProfileScreen extends React.Component {  
    render() {  
        return (  
            <View style={styles.tabContainer}>  
            <Text>Profile Screen</Text>  
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
