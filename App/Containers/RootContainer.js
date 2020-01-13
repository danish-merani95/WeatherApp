import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import * as Font from 'expo-font'

// Styles
import styles from './Styles/RootContainerStyles'
import AppNavigation from '../Navigation/AppNavigation'

class RootContainer extends Component {


  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <AppNavigation />
      </View>
    )
  }
}

export default connect(null, null)(RootContainer)
