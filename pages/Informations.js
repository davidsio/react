import React, { Component } from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

let code = [];


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



export default class Informations extends Component {
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
  
  constructor(props) {
    super(props);
    this.state = {
        loaded: false,
        code: []
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const itemValue = params ? params.itemValue : null;

    getJSON('http://elarnes.fr/get_qrcode.php?idQrCode=' + JSON.stringify(itemValue).replace(/['"]+/g, '').split(';')[1],
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

  componentDidUpdate(nextProps) {
    //this will triggered when the props changes - not needed for this
  }

  render() {

    if (!this.state.loaded)
        return <View />
    return (
      <View style={styles.container}>
        <QRCode
                  value={"sdbwfhjk"}
                  size={250}
                  color="black"
                  backgroundColor="white"
                  logoSize={30}
                  logoMargin={2}
                  logoBorderRadius={15}
                  logoBackgroundColor="yellow"
                />
                <Text>
                
                {this.state.code["code"]}
                {this.state.code["description"]}
                
                </Text>
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