import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';

import { Badge, Icon, SearchBar, Overlay, Button } from 'react-native-elements';

import Geolocation from '@react-native-community/geolocation';

import ProductList from './ProductList';

import Loader from './../Loader';

import ProductService from '../../services/ProductService';

export default function AvailableProductsView(props) {

  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleGetProducts = async () => {

    try {
      const response = await ProductService.getProducts();
      
      if(response.success) {
        setProducts(response.response);
      } else {
        Alert.alert('Error obteniendo productos: ' + response.message);
      }

    } catch(e) {
      Alert.alert('Error obteniendo productos. Trate más tarde.');
    }
  
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

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

    if(selectedProducts.length === 0 || total === 0) {
      return Alert.alert('Selecciona al menos un producto para continuar.');
    }

    setLoading(true);

    findCoordinates();

  }

  const findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLoading(false);
        const location = JSON.stringify(position);
        props.navigation.navigate('LocationMap', { total, location, selectedProducts });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const handleProductSelection = (productSelection) => {

    const newSelectedProducts = [...selectedProducts];

    const selectedProduct = newSelectedProducts.find(selectedProduct => selectedProduct.id === productSelection.id);

    if(selectedProduct) {
      selectedProduct.count = productSelection.count;
      setSelectedProducts(newSelectedProducts);
    } else {

      newSelectedProducts.push(productSelection);
      setSelectedProducts(newSelectedProducts);

    }

  };

  return (

    <View style={{ maxHeight: '100%' }}>

      <CartModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        emptyCart={emptyCart}
        order={order}
      />

      <Loader loading={loading} color={props.color}/>

      <View>
        <Text style={{ fontSize: 22, textAlign: 'center', color: props.color }}>Productos Disponibles</Text>
      </View>

      <SearchBar
        placeholder="Buscar..."
        onChangeText={setSearchString}
        value={searchString}
        round
        style={{padding: 0}}
        lightTheme
        inputStyle={{fontSize: 14, height: 10}}
      />

      <ProductList
        items={products.filter(product => product.description.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()))}
        setTotal={(productTotal) => handleSetTotal(productTotal)}
        handleItemCount={(totalItemCount) => handleItemCount(totalItemCount)}
        onProductSelect={(productSelection) => handleProductSelection(productSelection) }
        color={props.color}
      />

      <ShoppingCartView total={total} itemCount={selectedProducts.reduce((count, selectedProduct) => selectedProduct.count + count, 0)} setModalVisible={setModalVisible} order={order} color={props.color}/>

    </View>
  );
}

function ShoppingCartView(props) {

    return (
      <View style={styles.cartContainer}>

        <View key="shoppingCartIconContainer">
          <View>
            <Icon
              name='shopping-cart'
              type='font-awesome'
              color={props.color}
              size={44}
              onPress={() => props.setModalVisible(true)}
            />
            <Badge
              status="success"
              containerStyle={{ position: 'absolute', top: -4, right: -4 }}
              value={props.itemCount}  
            />
          </View>
        </View>

        <View key="ShoppingCartTotalContainer">
          <Text style={{ color: props.color, fontSize: 24 }}>RD${props.total.toFixed(2)}</Text>
        </View>

        <View key="ShoppingCartAngleContainer">
          <Icon
            name='angle-right'
            type='font-awesome'
            color={props.color}
            size={48}
            onPress={props.order}
          />
        </View>

      </View>
    )
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
          title="Ordenar"
          onPress={props.order}
        />

      </View>

    </Overlay>
  );

}

const styles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    justifyContent: "center"
  },

  cartContainer: {
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

