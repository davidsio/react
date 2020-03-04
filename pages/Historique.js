//This is an example code for Navigator// 
import React, { Component } from 'react';

//import react in our code. 
import { StyleSheet, View, Text, FlatList, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

//import all the components we are going to use.
let datas;
let html = []

const getAllData = () =>{
  AsyncStorage.getAllKeys().then((keys) => {
    return AsyncStorage.multiGet(keys)
      .then((result) => {
        datas = result;
        console.log("Storage : ",datas)
        setHtml()
      }).catch((e) =>{
        //console.log(e);
      });
  });
}

//AsyncStorage.clear();
getAllData()

const setHtml = () => {
  //html = []
  console.log("Data à afficher : ", datas)
  if (datas != undefined) {
    for (var i=0; i < datas.length; i++) {
      if (html.length <= i) {
        html.push(
          {key: datas[i][0], value: datas[i][1]},
        )
      }
      console.log("DOM : ", html)
    }
  }
}

export default class Historique extends Component {
  
  static navigationOptions = {
    title: 'Historique',
    //Sets Header text of Status Bar
  };


  /*
  constructor () {
    super()
  }
  */
  // UNSAFE_componentWillMount(){
  //   getAllData()
  //   setHtml()
  // }

  render() {

    getAllData()
    const { navigate } = this.props.navigation;
  
    return (
      <View style={styles.container}>
        <FlatList
          data={html}
          renderItem={({item}) => <View><Text style={styles.item}>{item.value}</Text><Button
          title="Press me"
          //onPress={() => Alert.alert('Simple Button pressed')}
        /></View>}
          
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //margin:50,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    //height: 44,
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  show: {
    textAlign: "right"
  }
});