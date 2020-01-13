import { Metrics, Colors, Fonts } from '../../Themes'

export default {
    mainContainer: {
        flex: 1,
        backgroundColor: '#009e9e',
    },
    currentDayContainer: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    seperator: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        opacity: 0.4,
    },
    seperatorList: {
        borderBottomColor: 'purple',
        borderBottomWidth: 1,
        opacity: 0.4,
    },
    weatherItemText: {
        color: 'white',
        fontSize: Fonts.size.medium,
    },
    currentWeatherText: {
        color: 'white',
        fontSize: Fonts.size.h3,
    },
    currentWeatherDescriptionText: {
        paddingTop: 16,
        color: 'white',
        fontSize: Fonts.size.h5,
    },
    forecastHeaderText: { 
        paddingLeft: 16, 
        paddingBottom: 4,
        color: 'white',
        fontSize: Fonts.size.regular,
    }
}
