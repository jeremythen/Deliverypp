import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, ActivityIndicator } from 'react-native';

import { Badge, Icon, SearchBar, Overlay, Button } from 'react-native-elements';

import Product from './Product';

import Geolocation from '@react-native-community/geolocation';

export default function AvailableProductsView(props) {

  let [total, setTotal] = useState(0);
  let [itemCount, setItemCount] = useState(0);
  let [searchString, setSearchString] = useState('');
  let [modalVisible, setModalVisible] = useState(false);
  let [loading, setLoading] = useState(false);
  
  const [location, setLocation] = useState(null);

  const handleSetTotal = (productTotal) => {
    setTotal(total + productTotal);
  }

  const handleItemCount = (totalItemCount) => {
    setItemCount(itemCount + totalItemCount);
  }

  const emptyCart = () => {
    setTotal(0);
    setItemCount(0);
    setSearchString('');
    setModalVisible(false);
  }

  const order = () => {

    setLoading(true);

    findCoordinates();

  }


  const findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLoading(false);
        const location = JSON.stringify(position);
        props.navigation.navigate('LocationMap', {total: total, location: location});
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  

  return (

    <View style={{ maxHeight: '100%' }}>

      <CartModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        emptyCart={emptyCart}
        order={order}
      />

      <Loader loading={loading} />

      <View>
        <Text style={{ fontSize: 22, textAlign: 'center' }}>
          Productos Disponibles
            </Text>
      </View>

      <View>
        <SearchBar
          placeholder="Buscar..."
          onChangeText={setSearchString}
          value={searchString}
          round={true}
        />
      </View>

      <ScrollView style={{ marginBottom: 60 }}>
        <View>

          {
            products.filter(product => product.title.toLowerCase().includes(searchString.toLowerCase())).map(product => {
              return (
                <Product
                  key={product.id}
                  product={product}
                  setTotal={(productTotal) => handleSetTotal(productTotal)}
                  handleItemCount={(totalItemCount) => handleItemCount(totalItemCount)}
                  color={mainColor}
                />
              )
            })
          }
        </View>

      </ScrollView>

      <View style={styles.cartContainer}>

        <View key="shoppingCartIconContainer">
          <View>
            <Icon
              name='shopping-cart'
              type='font-awesome'
              color={mainColor}
              size={44}
              onPress={() => setModalVisible(true)}
            />
            <Badge
              status="success"
              containerStyle={{ position: 'absolute', top: -4, right: -4 }}
              value={itemCount}
            />
          </View>
        </View>

        <View key="ShoppingCartTotalContainer">
          <Text style={{ color: mainColor, fontSize: 24 }}>RD${total.toFixed(2)}</Text>
        </View>

        <View key="ShoppingCartAngleContainer">
          <Icon
            name='angle-right'
            type='font-awesome'
            color={mainColor}
            size={48}
            onPress={() => order()}
          />
        </View>

      </View>


    </View>
  );
}

function CartModal(props) {

  return (
    <Overlay
      isVisible={props.modalVisible}
      width={200}
      height={130}
      onBackdropPress={() => props.setModalVisible(false)}
    >

      <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'stretch'}}>

        <Button
          iconRight
          icon={
            <Icon
              name="shopping-cart"
              color="white"
              size={28}
              type='font-awesome'
            />
          }
          title="Continuar "
          onPress={() => props.setModalVisible(false)}
        />

        <Button
          iconRight
          icon={
            <Icon
              name="check"
              color="white"
              size={28}
              type='font-awesome'
            />
          }
          title="Ordenar "
          onPress={props.order}
        />

      </View>

    </Overlay>
  );

}

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
        <ActivityIndicator size="large" color="#mainColor" />
        <Text style={{textAlign: 'center', color: 'grey'}}>Espere...</Text>
      </View>
    
    </Overlay>
  );

}

const mainColor = '#55a389';

const styles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    justifyContent: "center"
  },

  cartContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 60,
    borderTopColor: 'grey',
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    paddingLeft: 15,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'

  },
  items: {
    width: '45%',
    margin: 1
  }
});

const imageSize = {
  width: '100%',
  height: '80%'
}

const products = [
  {
    img: {
      uri: 'https://www.compradetodo.net/wp-content/uploads/2019/05/023ee5e3-6727-4256-a987-85aeffc9cb40_1.7b75d31d74a60cecd95d2445b34588c2.jpeg',
      id: 1,
      ...imageSize
    },
    title: 'Leche Evaporada Carnation, 34 oz',
    price: 50,
    id: 1

  },
  {
    img: {
      uri: 'https://elian.do/wp-content/uploads/2019/05/arroz-campo-10-libras.jpg',
      id: 2,
      ...imageSize
    },
    title: 'Arroz Campos, 2 libras',
    price: 90,
    id: 2

  },
  {
    img: {
      uri: 'https://lafamosa.com/wp-content/uploads/2016/11/Mai%CC%81z-dulce-15oz.jpg',
      id: 3,
      ...imageSize
    },
    title: 'Maiz Dulce La Famosa, 15 ox',
    price: 35,
    id: 3
  },
]