import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class CityModel extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('weather-db.db')
  }

  static get tableName() {
    return 'Cities'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true,},
      name: { type: types.TEXT, not_null: true },
      countryName: { type: types.TEXT, not_null: true  },
    }
  }
}