//This is an example code for Navigator// 
import React, { Component } from 'react';
//import react in our code. 
import { StyleSheet, View, Text} from 'react-native';
//import all the components we are going to use.


export default class Promotions extends Component {
  static navigationOptions = {
    title: 'Informations',
    headerBackTitle: 'Retour',
    headerStyle: {
      backgroundColor: '#557aca',
      //Sets Header color
    },
    headerTintColor: '#fff',
    //Sets Header text color
    headerTitleStyle: {
      fontWeight: 'bold',
      //Sets Header text style
    },
    //Sets Header text of Status Bar
  };

  render() {
    const { navigate } = this.props.navigation;

    const { params } = this.props.navigation.state;
    const itemValue = params ? params.itemValue : null;
    const itemId = params ? params.itemId : null;

    console.log(navigate.state);
    return (
      <View style={styles.container}>
                <Text>itemId: {JSON.stringify(itemId).replace(/['"]+/g, '')} {"\n"}
                itemValue: {JSON.stringify(itemValue).replace(/['"]+/g, '')}</Text>
                
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'

  },
});