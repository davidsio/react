import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import Accueil from './pages/Accueil';
import Historique from './pages/Historique';
import Promotions from './pages/Promotions';

const App = createStackNavigator({
    Accueil: { screen: Accueil }, 
    Historique: { screen: Historique }, 
    Promotions: { screen: Promotions }, 
  },
  {
    initialRouteName: 'Accueil',
  }
);
export default createAppContainer(App);