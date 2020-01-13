import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, FlatList, TouchableOpacity, Platform } from 'react-native'
import WeatherActions from '../../Redux/WeatherRedux'
import _ from 'lodash'


// Styles
import styles from './CityListScreenStyles'
import { SearchBar } from 'react-native-elements'


class CityListScreen extends Component {

  state = {
    searchedText: '',
  }

  componentDidMount = () => {
    this.props.requestCities()
  }

  didSelectCity = (city) => {
    this.props.navigation.navigate('WeatherForecast', { city: city })
  }

  renderSeperator = () => {
    return <View style={styles.seperator} />
  }

  updateSearch = text => {
    this.setState({searchedText: text})
  }

  renderItem = ( { item } ) => {
    const cityName = item.EnglishName + ', ' + item.Country.EnglishName
    return (
      <TouchableOpacity onPress={() => this.didSelectCity(item)}>
        <View style={ { paddingLeft: 16, paddingVertical: 16 } }>
          <Text style={styles.cityText}>{cityName}</Text>
        </View>
        {this.renderSeperator()}
      </TouchableOpacity>
    )
  }

  getCities = () => {
    const { cities = [] } = this.props
    const { searchedText = '' } = this.state

    if (_.isEmpty(searchedText)) {
      return cities
    } else {
      return cities.filter(city => city.EnglishName.includes(searchedText) || city.Country.EnglishName.includes(searchedText))
    }
  }


  render () {
    const { searchedText = '' } = this.state
    
    return (
      <View style={styles.mainContainer}>
          <SearchBar
            style={{ elevation: 10 }}
            platform={Platform.OS}
            placeholder="Search City"
            onChangeText={this.updateSearch}
            value={searchedText}
          />
        <FlatList
          data={this.getCities()}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    cities: state.weather.cities,
  }
}

const mapDispatchToProps = dispatch => ({
  requestCities: () => dispatch(WeatherActions.cityRequest()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityListScreen)

