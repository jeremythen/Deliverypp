import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight, TextInput, Dimensions, ScrollView } from 'react-native';

import { Icon, Overlay } from 'react-native-elements';

const {height, width} = Dimensions.get('window');

export default function ConfirmOrderView(props) {

    const [comment, setComment] = useState('');
    const [orderedProductsModalVisible, setOrderedProductsModalVisible] = useState(false);
    const [selectedProducts] = useState(props.route.params.selectedProducts);


    const [total] = useState(props.route.params.total);

    const closeOrderedProductsModal = () => {
        setOrderedProductsModalVisible(false);
    }

    return (

        <View style={[styles.mainContainer, {flex: 1, justifyContent: 'space-between'}]}>

            <OrderedProductsModal
                modalVisible={orderedProductsModalVisible}
                closeOrderedProductsModal={closeOrderedProductsModal}
                color={props.color}
                secondColor={props.secondColor}
                selectedProducts={selectedProducts}
                total={total}
            />

            <View>
                <View style={styles.rowContainer}>
                    <Text style={styles.textStyle}>Cliente: </Text>
                    <Text style={styles.textStyle}>Jeremy Then</Text>
                </View>

                <View style={styles.rowContainer}>
                    <Text style={styles.textStyle}>Teléfono: </Text>
                    <Text style={styles.textStyle}>8496203718</Text>
                </View>

                <View style={styles.rowContainer}>
                    <Text style={styles.textStyle}>Email: </Text>
                    <Text style={styles.textStyle}>jeremythen16@gmail.com</Text>
                </View>
            </View>
            
            <View>

                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor={props.secondColor}
                    onPress={() => setOrderedProductsModalVisible(true)}
                    style={{backgroundColor: props.color, borderRadius: 5 }}
                >
                <Text style={styles.button}>Productos ({selectedProducts.reduce((count, selectedProduct) => selectedProduct.count + count, 0)})</Text>
                </TouchableHighlight>

            </View>

            <View>
                <View style={styles.rowContainer}>
                    <Text style={styles.textStyle}>Total </Text>
                    <Text style={[styles.textStyle, {color: 'green'}]}>RD${total}</Text>
                </View>
            </View>

            <View>
                <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
                    <Text style={styles.textStyle}>Metodo de pago</Text>
                    <Icon
                        name='credit-card'
                        type='font-awesome'
                        color='grey'
                        onPress={() => Alert.alert('in icon')}
                    />
                    <Text style={styles.textStyle}>...4561</Text>
                </View>
            </View>

            <View>
                <View style={{padding: 8}}>
                    <Text style={styles.textStyle}>Comentario: </Text>
                    <TextInput
                        editable
                        maxLength={150}
                        multiline
                        numberOfLines={3}
                        onChangeText={text => setComment(text)}
                        value={comment}
                        placeholder="(Opcional) Introduce un comentario con detalles de la entrega."
                        style={{borderColor: props.color, borderWidth: 2, paddingTop: 0}}
                    />
                </View>
            </View>
            
            <View>
                <View style={[styles.rowContainer, {justifyContent: 'space-around'}]}>
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => props.navigation.navigate('Main')}
                        style={{backgroundColor: 'grey', borderRadius: 5 }}
                    >
                    <Text style={styles.button}>Cancelar</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        activeOpacity={0.6}
                        style={{borderColor: 'red', borderWidth: 2, paddingTop: 0}}
                        onPress={() => Alert.alert('Continuar')}
                        style={{backgroundColor: props.color, borderRadius: 5 }}
                        underlayColor={props.secondColor}
                    >
                    <Text style={styles.button}>Confirmar</Text>
                    </TouchableHighlight>
                </View>
            </View>

        </View>

    )

}

function OrderedProductsModal(props) {

    return (
      <Overlay
        isVisible={props.modalVisible}
        width={width}
        height={height}
        onBackdropPress={props.closeOrderedProductsModal}
      >

        <View>
            <View>
                <Text style={{textAlign: 'center', fontSize: 18, padding: 8, color: props.color}}>Productos Ordenados</Text>
            </View>
            <View style={{justifyContent: 'space-between', height: '90%'}}>
                
                <ScrollView>
                    {
                        props.selectedProducts.map(product => (
                            <View style={{borderColor: props.color, borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 5}}>
                                <View style={{marginBottom: 4}}>
                                    <Text style={{textAlign: 'center'}}>
                                        {
                                            product.description
                                        }
                                    </Text>
                                </View>

                                <View style={{flexDirection: 'row', justifyContent: 'space-around', flexGrow: 1}}>

                                    <View>
                                        <Text style={{textAlign: 'center'}}>{product.count}</Text>
                                        <Text style={{textAlign: 'center', fontSize: 10}}>Cantidad</Text>
                                    </View>

                                    <View>
                                        <Text style={{textAlign: 'center'}}>RD${product.price}</Text>
                                        <Text style={{textAlign: 'center', fontSize: 10}}>Precio Unidad</Text>
                                    </View>

                                    <View>
                                        <Text style={{textAlign: 'center'}}>RD${product.total}</Text>
                                        <Text style={{textAlign: 'center', fontSize: 10}}>Total</Text>
                                    </View>

                                </View>

                            </View>
                            
                        ))
                    }

                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 8}}>
                        
                            <View>
                                <Text style={{textAlign: 'center'}}>{props.selectedProducts.reduce((count, selectedProduct) => selectedProduct.count + count, 0)}</Text>
                                <Text style={{textAlign: 'center', fontSize: 10}}>Cantidad Total</Text>
                            </View>

                            <View>
                                <Text style={{textAlign: 'center'}}>RD${props.total}</Text>
                                <Text style={{textAlign: 'center', fontSize: 10}}>Total General</Text>
                            </View>

                        </View>

                </ScrollView>

                <View style={{padding: 8, justifyContent: 'center'}}>

                    <TouchableHighlight
                            style={{borderColor: 'red', borderWidth: 2, paddingTop: 0}}
                            onPress={props.closeOrderedProductsModal}
                            style={{backgroundColor: props.color, borderRadius: 5 }}
                            underlayColor={props.secondColor}
                        >
                        <Text style={styles.button}>Aceptar</Text>
                    </TouchableHighlight>

                </View>

            </View>
        </View>

      </Overlay>
    );
  
  }


const styles = StyleSheet.create({
    textStyle: {
        fontSize: 18
    },
    mainContainer: {
        padding: 6
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 6,
        fontSize: 28,
        justifyContent: 'space-between'
    },
    button: {
      alignItems: "center",
      padding: 10,
      color: 'white',
      textAlign: 'center'
    }
  
  });
