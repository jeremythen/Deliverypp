import Deliverypp from '../Deliverypp';

import AsyncStorage from '@react-native-community/async-storage';

const CategoryService = {
    getParamValue(param) {
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
    saveParamValue(param, value) {
        return AsyncStorage.setItem(`@Deliverypp:${param}`, value);
    },
    removeParam(param) {
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
    }
};

export default CategoryService;