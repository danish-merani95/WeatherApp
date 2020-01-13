import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class WeatherModel extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('weather-db.db')
  }

  static get tableName() {
    return 'Weathers'
  }

  static get columnMapping() {
    return {
      cityId: { type: types.INTEGER, not_null: true, unique: true },
      weatherData: { type: types.JSON, not_null: true,},
    }
  }
}