import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableHighlight, Alert } from 'react-native';

import { Card, Badge } from 'react-native-elements'

import CategoryService from '../../services/CategoryService';

const imageSize = {
    width: '100%',
    height: 100
}

const allProductsCategory = {
    id: 1,
    category: "Todos",
    key: 'all',
    imageUrl: "https://previews.123rf.com/images/moonkin/moonkin1302/moonkin130200002/17794846-recogida-de-alimentos-y-de-los-productos-que-compramos-o-comer-todos-los-d%C3%ADas.jpg"
}

function ProductsCategoriesView(props) {

    const [categories, setCategory] = useState([]);

    const handleGetCategories = async () => {

        try {
            const response = await CategoryService.getCategories();
            
            if(response.success) {
                const categories = response.response;
                categories.unshift(allProductsCategory);
                setCategory(categories);
            } else {
                Alert.alert('Error obteniendo categorias: ' + response.message);
            }

        } catch(e) {
            Alert.alert('Error obteniendo categorias. Trate más tarde.');
        }
        
    };

    useEffect(() => {
        handleGetCategories();
    }, []);


    const onPress = (category) => {
        props.navigation.navigate('AvailableProductsView', { category });
    };

    
    
    return (

        <View style={{ maxHeight: '100%' }}>

            <FlatList
                data={categories}
                renderItem={({item}) => (
                    <CategoryCard
                        key={item.id}
                        category={item}
                        onPress={onPress}
                        color={props.color}
                    /> 
                )}
                keyExtractor={item => item.id}
                style={{marginBottom: 60}}
                numColumns={2}
            />
        </View>

    );

}

function CategoryCard( { category, onPress, color } ) {

    const { id, imageUrl, category: categoryDesc } = category;

    return (
        <View key={id} onPress={onPress} style={{width: '50%'}}>
            <Card title={categoryDesc}>
                <View style={styles.imageContainerStyle}>
                    <Image onPress={onPress} source={{uri: imageUrl, ...imageSize}} key={id} />
                </View>

                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => onPress(categoryDesc) }
                    style={{backgroundColor: color}}
                >
                    <Text style={styles.button}>Ver</Text>
                </TouchableHighlight>

            </Card>
 

        </View>
    )

}

const categories = [
    {
        id: 1,
        key: "embutidos",
        category: "Embutidos",
        createdAt: "2020-05-10T01:54:32.881",
        updatedAt: null,
        imageUrl: "https://cdn2.salud180.com/sites/default/files/styles/medium/public/field/image/2017/09/embutidos_.jpg"
    },
    {
        id: 3,
        key: "lacteos",
        category: "Lácteos",
        createdAt: "2020-05-10T01:55:10.261",
        updatedAt: null,
        imageUrl: "https://www.yogurtinnutrition.com/wp-content/uploads/2019/09/yinimodel_post_ukdairydiet-1280x720.png"
    },
    {
        id: 5,
        key: "cereales",
        category: "Cereales",
        createdAt: "2020-05-10T01:57:40.95",
        updatedAt: null,
        imageUrl: "https://lh3.googleusercontent.com/proxy/SNkFLx1aQwQswKCloPsTf0aDCrSqRJ9_a3G9Jytkn3AX-O2zv9nvExVXX4VfwBkgr78JzBDCkXaNTK8CMBRa46f0rThHxhTSOiKxmGb_K99Jwc510NPYRp1LPTqqrG4"
    }
];

const styles = StyleSheet.create({

    imageContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 4,
   
    },
    button: {
        alignItems: "center",
        padding: 8,
        color: 'white',
        textAlign: 'center'
      }

});

export default ProductsCategoriesView;