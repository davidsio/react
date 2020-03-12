//This is an example code for Navigator// 
import React, { Component } from 'react';

//import react in our code. 
import { StyleSheet, View, Text, FlatList, Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, ThemeProvider, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


let datas;
let html = []

const getAllData = () =>{
  AsyncStorage.getAllKeys().then((keys) => {
    return AsyncStorage.multiGet(keys)
      .then((result) => {
        datas = result;
        datas.sort().reverse()
        setHtml()
      }).catch((e) =>{
      });
  });
}
//AsyncStorage.clear();
//getAllData()

const setHtml = () => {
  html = []
  if (datas != undefined) {
    for (var i=0; i < datas.length; i++) {
      if (html.length <= i) {
        html.push(
          {key: datas[i][0], value: datas[i][1].split(';')[1]},
        )
      }
    }
  }
}

let getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};



export default class Historique extends Component {

  static navigationOptions = {
    title: 'Historique',
    headerBackTitle: 'Retour',
    headerStyle: {
      backgroundColor: '#557aca',
      borderBottomColor: 'gainsboro',

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

  constructor(props) {
    super(props);
    this.state = {
        loaded: false,
        code: []
    };
  }

  componentDidMount() {

    getJSON('http://elarnes.fr/get_qrcode.php?idQrCode=MARCODAY',
    (err, data) => {
        if (err !== null) {
            console.log('Something went wrong: ' + err);
        } else {
            this.setState({
              code: data[0],
              loaded: true,
            })
        }
      }
    );
  }

  render() {

    getAllData()
    
    const { navigate } = this.props.navigation;
    if (!this.state.loaded)
      return <View />
    return (
      <View style={styles.container}>
        <FlatList
          data={html}
          renderItem={
            ({item}) => 
              <View style={styles.item}><Text style={styles.itemText}>{item.value}</Text>
                <ThemeProvider>
                  <Button style={styles.button}
                    title="Visualiser"
                    titleStyle={{fontSize: 15}}
                    onPress={() => navigate('Informations', {
                      itemValue: item.value
                    })}
                  />
                </ThemeProvider>
              </View>
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'gainsboro',
    backgroundColor: 'whitesmoke'
  },
  itemText: {
    padding: 10,
    fontSize: 15,
    textAlign: "center"
  },
  show: {
    textAlign: "right"
  },
  button: {
    marginBottom: 10,
    alignItems: "center",
    fontSize: 15,
  }
});

/*
                  <Button style={styles.button}
                    title="Visualiser"
                    titleStyle={{fontSize: 15}}
                    onPress={() => Alert.alert("Info",item.value)}
                  />
*/