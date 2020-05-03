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

      <View style={styles.bottomContainer}>
        <Icon
          name="user"
          type="font-awesome"
          color={iconsColor}
          size={36}
          onPress={() => Alert.alert('in icon')}
        />

        <Icon
          name="credit-card"
          type="font-awesome"
          color={iconsColor}
          size={36}
          onPress={() => Alert.alert('in icon')}
        />

        <Icon
          name="user"
          type="font-awesome"
          color={iconsColor}
          size={36}
          onPress={() => Alert.alert('in icon')}
        />

        <Icon
          name="cog"
          type="font-awesome"
          color={iconsColor}
          size={36}
          onPress={() => Alert.alert('in icon')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        justifyContent: 'center',


    },
    bottomContainer: {

        flexDirection: 'row',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        height: 50,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: 8
    }
})

export default Main;
