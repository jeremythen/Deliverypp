import Deliverypp from '../Deliverypp';

import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

const CategoryService = {
    async getParamValue(param) {
        return AsyncStorage.getItem(
            `@Deliverypp:${param}`,
              (err, data) => {
                  if(err) {
                    return null;
                  } else {
                      return data;
                  }
              }
        );
    },
    async saveParamValue(param, value) {
        return AsyncStorage.setItem(`@Deliverypp:${param}`, JSON.stringify(value)).then(() => ({success: true}));
    },
    async removeParam(param) {
        return AsyncStorage.removeItem(`@Deliverypp:${param}`);
    },
    getLocalUserData() {
        return this.getParamValue("user");
    },
    saveLocalUserData(user) {
        return this.saveParamValue("user", user);
    },
    isUserLoggedIn() {
        return Deliverypp.user.isLoggedIn;
    },
    removeLocalUser() {
        this.removeParam('user');
    }
};

export default CategoryService;