import CityModel from './Models/CityModel'
import WeatherModel from './Models/WeatherModel'

export default createTables = async () => {
    let database = await CityModel.database
    await CityModel.createTable()
    await WeatherModel.createTable()
}
