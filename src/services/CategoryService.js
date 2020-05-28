import axios from 'react-native-axios';

import Deliverypp from '../Deliverypp';

const basePath = Deliverypp.apiBaseUrl;

const CategoryService = {
    async handleResponse(response) {
        if(response && response.data) {
            const deliveryppResponse = response.data;
    
            return deliveryppResponse;
        }
    },
    async getCategories() {

        const response = await axios.get(`${basePath}/api/categories`);

        return this.handleResponse(response);

    }
};

export default CategoryService;