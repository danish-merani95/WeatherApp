import './App/Config/ReactotronConfig'
import * as Expo from 'expo'
import DebugConfig from './App/Config/DebugConfig'

const Entrypoint =
  __DEV__ && DebugConfig.launchStorybook
    ? require('./storybook').default
    : require('./App/Containers/App').default

Expo.registerRootComponent(Entrypoint)
