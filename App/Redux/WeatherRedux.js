import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cityRequest: null,
  citySuccess: ['cities'],
  cityFailure: null,
  forecastRequest: ['cityKey'],
  forecastSuccess: ['forecasts'],
  forecastFailure: null,
})

export const WeatherTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingCities: false,
  fetchingForecast: false,
  cities: [],
  forecasts: [],
  error: false,
  lastUpdatedCityTime: 0,
})


/* ------------- Selectors ------------- */

export const WeatherSelectors = {
  getGeoLocation: (state, city) => {
    let cityDetails = state.weather.cities.find(_city => _city.Key === city.Key)
    if (cityDetails) return cityDetails.GeoPosition
    else return null
  },
}


/* ------------- Reducers ------------- */

// request the avatar for a user
export const requestCities = (state) =>
  state.merge({ fetching: true, cities: [] })

// successful avatar lookup
export const successCities = (state, { cities }) => {
  return state.merge({ fetching: false, error: null, cities })
}

// failed to get the avatar
export const failureCities = (state) =>
  state.merge({ fetching: false, error: true, cities: null })

// request the avatar for a user
export const requestForecast = (state) =>
  state.merge({ fetching: true, forecasts: [] })

// successful avatar lookup
export const successForecast = (state, { forecasts }) => {
  return state.merge({ fetching: false, error: null, forecasts })
}

// failed to get the avatar
export const failureForecast = (state) =>
  state.merge({ fetching: false, error: true, forecasts: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CITY_REQUEST]: requestCities,
  [Types.CITY_SUCCESS]: successCities,
  [Types.CITY_FAILURE]: failureCities,
  [Types.FORECAST_REQUEST]: requestForecast,
  [Types.FORECAST_SUCCESS]: successForecast,
  [Types.FORECAST_FAILURE]: failureForecast,
})
