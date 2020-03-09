import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import Accueil from './pages/Accueil';
import Historique from './pages/Historique';
import Promotions from './pages/Promotions';
import Informations from './pages/Informations';

const App = createStackNavigator({
    Accueil: { screen: Accueil }, 
    Historique: { screen: Historique }, 
    Promotions: { screen: Promotions }, 
    Informations: { screen: Informations }, 
  },
  {
    initialRouteName: 'Accueil',
  }
);
export default createAppContainer(App);