import React, { useState, useEffect } from 'react';
import { View, Text , Alert} from 'react-native';

import OrderService from '../../services/OrderService';

function OrderView() {

    const [orders, setOrders] = useState([]);

    const handleGetOrders = async () => {

        try {

          const response = await OrderService.getUserOrders();
          
          if(response.success) {
            const orders = response.response;
            setOrders(orders);
          } else {
            Alert.alert('Error obteniendo orders: ' + response.message);
          }
    
        } catch(e) {
          Alert.alert('Error obteniendo orders. Trate más tarde.');
        }
      
      };
    
      useEffect(() => {
    
        handleGetOrders();
    
      }, []);


    return (
        <View>
            <Text>In orders view 2</Text>
        </View>
    )
}

export default OrderView;