/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { NativeModules } from 'react-native'
module.exports = NativeModules.BlueshiftBridge

AppRegistry.registerComponent(appName, () => App);
