import React from 'react';

import {
    View,
    Text,
    StyleSheet
  } from 'react-native';

class PaymentMethodView extends React.Component {  
    render() {  
        return (  
            <View style={styles.tabContainer}>  
            <Text>Payment Method View</Text>  
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

export default PaymentMethodView;
