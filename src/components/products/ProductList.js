
import React from 'react';
import { FlatList } from 'react-native';

import Product from './Product';

function ProductList(props) {
    return (
        <FlatList
            data={props.items}
            renderItem={({item}) => (
                <Product
                    key={item.id}
                    product={item}
                    setTotal={(productTotal) => props.setTotal(productTotal)}
                    handleItemCount={(totalItemCount) => props.handleItemCount(totalItemCount)}
                    color={props.color}
                /> 
            )}
            keyExtractor={item => item.id}
            style={{marginBottom: 60}}
        />
    )
}

export default ProductList;