/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { LoginScreen } from './components/LoginScreen'
import { MainScreen } from './components/MainScreen' 
import { RegistrationScreen } from './components/RegistrationScreen'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const RootStack = createStackNavigator(
  {
    Login: {screen: LoginScreen },
    Main: {screen: MainScreen },
    Register: {screen: RegistrationScreen}
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(RootStack);

const App = () => (
  <AppContainer />
);

export default App;