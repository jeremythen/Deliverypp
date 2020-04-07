import React, { useState } from 'react';

import { StyleSheet, Image, View, Text, Button, Alert, Modal } from 'react-native';
import { Icon } from 'react-native-elements';

export default function Product(props) {

    const price = props.product.price;

    const [itemCount, setItemCount] = useState(0);
    const [total, setTotal] = useState(0);
    
    const reduceItemCount = () => {
        if (itemCount > 0) {
            setItemCount(itemCount - 1);
            props.handleItemCount(-1);
            setTotal(total - price);
            props.setTotal(-price); 
        }
    }

    const increaseItemCount = () => {
        setItemCount(itemCount + 1);
        props.handleItemCount(1);
        setTotal(total + price);
        props.setTotal(price);
    }

    const mainStyle = StyleSheet.create({

        container: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            height: 220,
            margin: 6,
            borderRadius: 15,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
            backgroundColor: 'white',
            borderColor: itemCount > 0 ? props.color : 'white',
            borderWidth: 2,

        },
    });

    return (


        <View style={mainStyle.container}>

            <View style={style.imageContainerStyle}>
                <Image source={props.product.img} key={props.product.img.id} />
            </View>

            <View style={style.detailsContainer}>

                <View style={{height: 65, marginBottom: 10, overflow: 'hidden'}}>

                    <Text style={style.textStyle}>{props.product.title}</Text>

                </View>

                <View>

                    <Text style={style.textStyle}>RD${price.toFixed(2)}</Text>

                </View>

                <View style={style.addRemoveItemContainer}>

                    <View>
                        <Icon
                            raised
                            name='minus'
                            type='font-awesome'
                            color={props.color}
                            onPress={() => reduceItemCount()}
                            size={20}
                        />
                    </View>

                    <View>
                        <Text style={{fontSize: 24}}>{itemCount}</Text>
                    </View>

                    <View>
                        <Icon
                            raised
                            name='plus'
                            type='font-awesome'
                            color={props.color}
                            onPress={() => increaseItemCount()}
                            size={20}
                            />
                    </View>
                    
                </View>

                <View>
                    <Text style={style.textStyle}>Total RD${total.toFixed(2)}</Text>
                </View>

            </View>

        </View>

    )

}

const style = StyleSheet.create({

    textStyle: {
        textAlign: 'center',
        padding: 8
    },
    items: {
        width: '50%',
    },
    imageContainerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        borderRadius: 15,
        margin: 4,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    detailsContainer: {
        margin: 4,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    addRemoveItemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        alignItems: 'center'
    },
    addRemoveItemButton: {
        width: 20,
        fontSize: 28
    }

})