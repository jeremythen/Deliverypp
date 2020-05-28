import axios from 'react-native-axios';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Deliverypp from '../Deliverypp';

const basePath = Deliverypp.apiBaseUrl;

const OrderService = {
    async getParamValue(param) {
        return AsyncStorage.getItem(
            `@Deliverypp:${param}`,
              (err, data) => {
                  if(err) {
                    Alert.alert('Hubo un error. Trata más tarde');
                  } else {
                      return data;
                  }
              }
        );
    },
    generateErrorResponse(message) {
        const responseData = {
            success: false,
            status: 'ERROR',
            message: message
        };

        return responseData;
    },
    handleResponse(response) {
        if(response && response.data) {
            const deliveryppResponse = response.data;
    
            return deliveryppResponse;
        }
    },
    async getUserOrders() {

        try {
 
            const token = await this.getParamValue('jwtToken');
            const userId = await this.getParamValue('userId');

            const headers = {
                Authorization: `Bearer ${token}`
            };

            const response = await axios.get(`${basePath}/api/orders/user/${userId}`, { headers });

            return this.handleResponse(response);
    
        } catch(e) {

            return this.generateErrorResponse(e.message);

        }

    },
    async getOrders() {

        try {
            const token = localStorage.getItem('deliverypp_user_login_token');

            const headers = {
                Authorization: `Bearer ${token}`
            };

            const response = await axios.get(`${basePath}/api/orders`, { headers });

            return this.handleResponse(response);
    
        } catch(e) {

            return this.generateErrorResponse(e.message);

        }

    },
    
    async getOrderById(orderId) {

        try {

            const token = localStorage.getItem('deliverypp_user_login_token');

            const headers = {
                Authorization: `Bearer ${token}`
            };
    
            const response = await axios.get(`${basePath}/api/orders/${orderId}`, { headers });
    
            return this.handleResponse(response);
    
        } catch(e) {

            return this.generateErrorResponse(e.message);

        }
    
    },
    
    async addOrder(order) {

        try {
            
            const token = localStorage.getItem('deliverypp_user_login_token');

            const headers = {
                Authorization: `Bearer ${token}`
            };
    
            const response = await axios.post(`${basePath}/api/orders`, order, { headers });
    
            return this.handleResponse(response);
    
        } catch(e) {

            return this.generateErrorResponse(e.message);

        }

    },
    
};

export default OrderService;