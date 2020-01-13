import React, { Component } from 'react'
import { Text, View, FlatList, Dimensions } from 'react-native'
import WeatherActions from '../../Redux/WeatherRedux'
import moment from 'moment'
import _ from 'lodash'

import { WeatherSelectors } from '../../Redux/WeatherRedux'

import MapView, { Marker } from 'react-native-maps';

// Styles
import styles from './MapScreenStyles'
import { connect } from 'react-redux'

class MapScreen extends Component {

  

  constructor(props) {
    super(props)
    this._mapView = null
  }

  static navigationOptions = ({ navigation }) => {
    const { city } = navigation.state.params
    return {
      title: city.EnglishName,
    }
  }

  componentDidMount = () => {
    const {geoPosition} = this.props

    if (this._mapView) {
        this._mapView.animateToRegion({
            latitude: geoPosition.Latitude,
            longitude: geoPosition.Longitude,
            longitudeDelta:0.1,
            latitudeDelta:0.1
        }, 1000)
    }
  }

  render () {
    const { geoPosition, forecasts = [] } = this.props

    const currentForecast = forecasts.length > 0 ? forecasts[0] : null
    const currentMinTemprature = currentForecast ? currentForecast.Temperature.Minimum.Value : '-'
    const currentMaxTemprature = currentForecast ? currentForecast.Temperature.Maximum.Value : '-'
    const currentTemprature = currentMaxTemprature + ' / ' + currentMinTemprature + ' F'

    return (
      <View style={styles.mainContainer}>
          <MapView 
            ref = {(mapView) => { this._mapView = mapView }}
            style={styles.mapStyle}>
                <Marker
                    coordinate={{latitude: geoPosition.Latitude, longitude: geoPosition.Longitude}}
                    title={currentTemprature}
                />
            </MapView>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
    const city = props.navigation.state.params.city
    return {
        city,
        geoPosition: WeatherSelectors.getGeoLocation(state, city),
        forecasts: state.weather.forecasts,
    }
}


export default connect(
  mapStateToProps,
  null
)(MapScreen)

