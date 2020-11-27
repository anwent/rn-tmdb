/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler'
import React from 'react';
import {
  LogBox
} from 'react-native';

import {
} from 'react-native/Libraries/NewAppScreen';

import {
  TMDBNavigation
} from './src/navigator/MainNavigation'


const App: () => React$Node = () => {


  console.disableYellowBox = true;

  LogBox.ignoreAllLogs();
  return (
    <TMDBNavigation />
  );
};

export default App;
