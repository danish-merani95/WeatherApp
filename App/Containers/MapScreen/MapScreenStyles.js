import { Metrics, Colors, Fonts } from '../../Themes'
import {  Dimensions } from 'react-native';

export default {
    mainContainer: {
        flex: 1,
        backgroundColor: '#009e9e',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
}
