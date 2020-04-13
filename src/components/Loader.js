
import React from 'react';

import { Badge, Icon, SearchBar, Overlay, Button } from 'react-native-elements';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';

function Loader(props) {

    return (
      <Overlay
        isVisible={props.loading}
        overlayBackgroundColor="rgba(255, 255, 255, .5)"
        overlayStyle={{borderWidth: 0, borderColor: 'transparent'}}
        width={'100%'}
        height={'100%'}
      >
  
        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', textAlign: 'center'}}>
          <ActivityIndicator size="large" color={props.color} />
          <Text style={{textAlign: 'center', color: props.color}}>Espere...</Text>
        </View>
      
      </Overlay>
    );
  
}

export default Loader;