import React from 'react';

import {Alert, Button, View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const iconsColor = 'grey';

function Main(props) {
  return (
    <View style={styles.mainContainer}>
      <Button
        title="Productos"
        onPress={() => props.navigation.navigate('AvailableProductsView')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        justifyContent: 'center',


    }
})

export default Main;
