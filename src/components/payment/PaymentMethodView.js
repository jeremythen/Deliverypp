import React, { useState } from 'react';

import {View, StyleSheet, Alert, Text, TouchableHighlight} from 'react-native';

import {Input, Icon, Overlay} from 'react-native-elements';

import AddCardView from './AddCardView';

import Deliverypp from '../../Deliverypp';

const cards = [ {cardNum: '123456789012345', exp: '05/22'}, {cardNum: '123456789012346', exp: '02/23'}]

function PaymentMethodView({}) {

  const [showModal, setShowModal] = useState(false);
  const [card, setCard] = useState(() => {});

  const onModalClose = () => {
    setShowModal(false);
  }

  const onOpenModal = () => {
    setShowModal(true);
  }

  const onCardSubmit = (card) => {
    setCard(card);
    Alert.alert('card: ' + JSON.stringify(card));
    // TODO: Save card in user object, locally.
    // UserService.saveCard(card);

    /*

      {values: {number: '123', expiry: '03/23', cvc: '523', name: 'Jeremy', type: 'master-card'}, valid: true, status: {number: 'valid', expiry: 'valid', cvc: 'valid', name: 'valid'}}

    */
  }

  return (
    <View style={styles.tabContainer}>
      <AddCardModal visible={showModal} onClose={onModalClose} onSubmit={onCardSubmit} />
      <View style={{ width: 100, width: '100%' }}>
        {cards.map(card => (
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <Icon
              raised
              name="credit-card"
              type="font-awesome"
              color={Deliverypp.mainColor}
              onPress={() => console.log('hello')}
            />
            <Text>{'...' + card.cardNum.substr(card.cardNum.length - 4, card.cardNum.length)}</Text>
            <Text>{card.exp}</Text>
          </View>
        ))}
        <View>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={onOpenModal}
            style={{backgroundColor: Deliverypp.mainColor}}
            >
            <Text style={styles.button}>Agregar Tarjeta</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

function AddCardModal({ visible, onClose, onSubmit }) {

  return (
    <Overlay
        isVisible={visible}
        overlayBackgroundColor="#fff"
        overlayStyle={{borderWidth: 0, borderColor: 'transparent'}}
        width={'100%'}
        height={'100%'}
      >
        <View>
          <View>
            <AddCardView onSubmit={onSubmit} />
          </View>

          <View>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={onClose}
              style={{backgroundColor: Deliverypp.mainColor}}
              >
              <Text style={styles.button}>Cerrar</Text>
            </TouchableHighlight>
          </View>
        </View>
    </Overlay>
  )

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
  button: {
    alignItems: "center",
    padding: 10,
    color: 'white',
    textAlign: 'center'
  }
});

export default PaymentMethodView;
