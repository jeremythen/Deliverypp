import axios from 'react-native-axios';

import Deliverypp from '../Deliverypp';

import DeliveryppService from './DeliveryppService';

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

            const deliveryppResponse = response.data;

            return deliveryppResponse;

        }
    },
    async register(user) {

        try {
            const response = await axios.post(`${basePath}/api/register`, user);

            const responseData = this.handleResponse(response);
    
            return responseData;
    
        } catch(e) {

            return this.generateErrorResponse(e);

        }

    },
    async login(user) {

        try {
            const response = await axios.post(`${basePath}/api/login`, user);

            const responseData = this.handleResponse(response);

            if(responseData.success) {

                const user = responseData.response.user;
                user.token = responseData.response.token;

                DeliveryppService.saveLocalUserData(user);

                Deliverypp.user = user;

            }

            return responseData;
    
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

    },
    logout() {

        const emptyUser = { isLoggedIn: false, name: '', lastName: '', telephone: '', email: '', location: { longitude: 0, latitude: 0 }};

        Deliverypp.user = emptyUser;

        return DeliveryppService.saveLocalUserData(emptyUser);

    }
    
};

export default AuthService;