import { call, put } from 'redux-saga/effects'
import WeatherActions from '../Redux/WeatherRedux'
import TranslationLayer from '../Database/TranslationLayer'
import _ from 'lodash'
import DBLayer from '../Database/DBLayer'
import CityModel from '../Database/Models/CityModel'
import WeatherModel from '../Database/Models/WeatherModel'

const key1 = 'MH2oLL0K6AkbmBcxaLFNlxMw59NZSiSl'
const key2 = 'gWmwus0oVr0j7Lt8vTFy559gK4Azvetg'

export function * getCities (api) {

  const response = yield call(api.getCities, 50, key1)
  // const response = []
  if (response.ok) {    
    // do data conversion here if needed

    if (!_.isEmpty(response.data)) {
      translatedCityModels = TranslationLayer.translateCityResponseToCityModel(response.data)
      DBLayer.bulkInsertOrUpdate(translatedCityModels, CityModel)
    }
    yield put(WeatherActions.citySuccess(response.data))
  } else {
    yield put(WeatherActions.cityFailure())
  }
}

export function * getWeatherForecast (api, { cityKey }) {

  const response = yield call(api.getForecast, cityKey, key1)
  // console.log('getWeatherForecast response: ', { cityKey })
  // const response = []
  if (response.ok) {
    // do data conversion here if needed
    if (!_.isEmpty(response.data)) {
       TranslationLayer.translateWeatherResponseToWeatherModel(response.data, cityKey).then(translatedWeatherModel => {
        DBLayer.insertOrUpdate(translatedWeatherModel, WeatherModel).then(res => {
          console.log('Insert Successfull')
        })
      })
    }
    yield put(WeatherActions.forecastSuccess(response.data.DailyForecasts))
  } else {
    yield put(WeatherActions.forecastFailure())
  }
}
