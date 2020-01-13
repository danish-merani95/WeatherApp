import { createStackNavigator } from 'react-navigation'

import styles from './Styles/NavigationStyles'
import CityListScreen from '../Containers/CityListScreen'
import WeatherForecastScreen from '../Containers/WeatherForecastScreen'
import MapScreen from '../Containers/MapScreen'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({

  CityList: { 
    screen: CityListScreen, 
    navigationOptions: () => ({
      title: `Select Your City`,
      headerBackTitle: null,
    }), 
  }, 

  WeatherForecast: {
    screen: WeatherForecastScreen, 
  },

  MapScreen: {
    screen: MapScreen, 
  },
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'CityList',
  navigationOptions: {
    headerStyle: styles.header,
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
})

export default PrimaryNav
