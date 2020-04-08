import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height,
    width
  },
    map: {
      height,
      width
    }

});


class LocationMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      region: {
        latitude: 18.4667,
        longitude: -69.9000,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
    
    this.onMapReady = this.onMapReady.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);

  }

  onMapReady() {
    console.log('map ready');
  }

  onRegionChange() {
    console.log('onRegionChange')
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
          >

          <MapView.Marker
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude,
            }}
          
            title={'Your Location'}

          />

        </MapView>
      </View>
      
    );
  }
}

export default LocationMap;
