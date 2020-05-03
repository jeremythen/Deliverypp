import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text, Alert, TouchableHighlight } from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height,
    width
  },
  map: {
    height: height - 100,
    width
  },
  button: {
    alignItems: "center",
    padding: 10,
    color: 'white',
    textAlign: 'center'
  }

});


class LocationMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      region: {
        ...JSON.parse(this.props.route.params.location).coords,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
    
    this.onRegionChange = this.onRegionChange.bind(this);
    this.getResponse = this.getResponse.bind(this);
  }

  onRegionChange(region) {
    this.setState({region});
  }


  getResponse() {
    return  { total: this.props.route.params.total, location: {latitude: this.state.region.latitude, longitude: this.state.region.longitude }, selectedProducts: this.props.route.params.selectedProducts };
  }

  render() {

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          showsUserLocation={true}
          showsCompass={true}
          zoomControlEnabled={true}
          showsTraffic={true}
          onRegionChange={(region) => this.onRegionChange(region)}
          >

          <MapView.Marker
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude,
            }}
          
            title={'Your Location'}
          />

        </MapView>

        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => this.props.navigation.navigate('ConfirmOrderView', this.getResponse())}
            style={{backgroundColor: this.props.color}}
        >
          <Text style={styles.button}>Continuar</Text>
        </TouchableHighlight>

      </View>
      
    );
  }
}

export default LocationMap;
