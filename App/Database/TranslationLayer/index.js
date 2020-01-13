import CityModel from "../Models/CityModel"

translateCityResponseToCityModel = (cityResponse = []) => {
    return cityResponse.map(city => {
        return {id: city.Key, name: city.EnglishName, countryName: city.Country.EnglishName}
    })
}

translateWeatherResponseToWeatherModel = async (weatherReponse, cityKey) => {
    const cityModel = await CityModel.find(cityKey)
    return { cityId: cityModel.id, weatherData: weatherReponse }
}

export default { translateCityResponseToCityModel, translateWeatherResponseToWeatherModel }
