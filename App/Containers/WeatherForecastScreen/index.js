import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import WeatherActions from '../../Redux/WeatherRedux'
import moment from 'moment'
import _ from 'lodash'
// Styles
import styles from './WeatherForecastScreenStyles'
import { connect } from 'react-redux'

class WeatherForecastScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    const { city } = navigation.state.params

    return {
      title: city.EnglishName,
    }
  }

  componentDidMount = () => {
    const { requestForecast, city } = this.props
    requestForecast(city.Key)
  }

  formatedDate = (date, format = 'MMM D') => {
    return moment(date).format(format)
  }

  renderSeperator = () => {
    return <View style={styles.seperator} />
  }

  renderSeperatorList = () => {
    return <View style={styles.seperatorList} />
  }
  
  showMapButtonTapped = () => {
    const { navigation } = this.props
    const { city } = navigation.state.params
    console.log('showMapButtonTapped city:', city)
    navigation.navigate('MapScreen', { city })
  }

  renderItem = ({ item }) => {
    const minTemprature = item.Temperature.Minimum.Value
    const maxTemprature = item.Temperature.Maximum.Value

    const temprature = maxTemprature + ' / ' + minTemprature + ' F'
    const weatherDescription = item.Day.IconPhrase
    const date = this.formatedDate(item.Date)
    
    return (
      <View>
        <View style={{ paddingVertical: 16, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.weatherItemText}>{date}</Text>
          <Text style={styles.weatherItemText}>{weatherDescription}</Text>
          <Text style={styles.weatherItemText}>{temprature}</Text>
        </View>
        {this.renderSeperator()}
      </View>
    )
  }

  render () {
    const { forecasts = [] } = this.props

    const currentForecast = forecasts.length > 0 ? forecasts[0] : null
    const currentMinTemprature = currentForecast ? currentForecast.Temperature.Minimum.Value : '-'
    const currentMaxTemprature = currentForecast ? currentForecast.Temperature.Maximum.Value : '-'

    const currentTemprature = currentMaxTemprature + ' / ' + currentMinTemprature + ' F'
    const currentWeatherDescription = currentForecast ? currentForecast.Day.IconPhrase : '-'

    let forecastsExceptCurrentDate = forecasts ? _.cloneDeep(forecasts): []
    forecastsExceptCurrentDate.shift() 

    return (
      <View style={styles.mainContainer}>
          <View style={[styles.currentDayContainer, {paddingVertical: 32}]}>
              <Text style={styles.currentWeatherText}>{currentTemprature}</Text>
              <Text style={styles.currentWeatherDescriptionText}>{currentWeatherDescription}</Text>
          </View>
          <Text style={styles.forecastHeaderText} >5 Days Forecast</Text>
          {this.renderSeperatorList()}
          <View style={styles.mainContainer}>
            <FlatList
              data={forecastsExceptCurrentDate}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              renderItem={this.renderItem}
            />

          </View>
          <View style={[{flex: 1, paddingLeft: 16, paddingTop: 24}]}>
            <TouchableOpacity onPress={this.showMapButtonTapped}>
                <Text style={{color: 'white'}}>Show On Map</Text>
              </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    city: props.navigation.state.params.city,
    forecasts: state.weather.forecasts,
  }
}

const mapDispatchToProps = dispatch => ({
  requestForecast: (cityKey) => dispatch(WeatherActions.forecastRequest(cityKey)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherForecastScreen)

