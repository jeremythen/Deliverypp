import axios from 'react-native-axios';

import Deliverypp from '../Deliverypp';

import DeliveryppService from './DeliveryppService';
import { Alert } from 'react-native';

const basePath = Deliverypp.apiBaseUrl;

const AuthService = {
    generateErrorResponse(error) {

        let message = error.message;

        if(message.includes('401')) {
            message = "Credenciales incorrectas. Verifique que su usuario y contraseña son correctos."
        }

        const responseData = {
            success: false,
            status: 'ERROR',
            message: message
        };

        return responseData;
    },
    handleResponse(response) {
        if(response && response.data) {
            return response.data;
        }

        return {
            success: false
        }
        
    },
    async register(user) {

        try {
            const response = await axios.post(`${basePath}/api/register`, user);

            const responseData = this.handleResponse(response);

            if(responseData.success) {
                return this.setUserData(responseData.response);
            }
    
            return {
                error: true
            };
    
        } catch(e) {

            return this.generateErrorResponse(e);

        }

    },
    setUserData(response) {
        const user = response.user;
        user.token = response.token;
        user.isLoggedIn = true;
        //return Alert.alert('user: ' + JSON.stringify(user))
        return DeliveryppService.saveLocalUserData(user);
        
    },
    async login(user) {

        try {
            const response = await axios.post(`${basePath}/api/login`, user);

            const responseData = this.handleResponse(response);

            if(responseData.success) {
                //return Alert.alert('res: ' + JSON.stringify(responseData.response))
                return this.setUserData(responseData.response);

            }

            return {
                error: true
            };
    
        } catch(e) {
            
            return this.generateErrorResponse(e);

        }
        
    },
    async getUserByToken(token) {

        try {

            const headers = {
                Authorization: `Bearer ${token}`
            };
    
            const response = await axios.get(`${basePath}/api/auth/${token}`, headers);
    
            const responseData = this.handleResponse(response);
    
            return responseData;
    
        } catch(e) {

            return this.generateErrorResponse(e);
            
        }

    }
    
};

export default AuthService;