//This is an example code for Navigator// 
import React, { Component } from 'react';
//import react in our code. 
import { StyleSheet, View, Text} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

//import all the components we are going to use.



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

  

  render() {

    const { navigate } = this.props.navigation;

    const { params } = this.props.navigation.state;
    const itemValue = params ? params.itemValue : null;
    const itemId = params ? params.itemId : null;

    getJSON('http://elarnes.fr/get_qrcode.php?idQrCode=' + JSON.stringify(itemValue).replace(/['"]+/g, '').split(';')[1],
    function(err, data) {
      if (err !== null) {
        console.log('Something went wrong: ' + err);
      } else {
        tabCode = data[0]
      }
    });

    return (
      <View style={styles.container}>
        <QRCode
                  //QR code value
                  value={JSON.stringify(itemValue).replace(/['"]+/g, '')}
                  //size of QR Code
                  size={250}
                  //Color of the QR Code (Optional)
                  color="black"
                  //Background Color of the QR Code (Optional)
                  backgroundColor="white"
                  //Logo of in the center of QR Code (Optional)

                  //Center Logo size  (Optional)
                  logoSize={30}
                  //Center Logo margin (Optional)
                  logoMargin={2}
                  //Center Logo radius (Optional)
                  logoBorderRadius={15}
                  //Center Logo background (Optional)
                  logoBackgroundColor="yellow"
                />
                <Text>
                
                {tabCode["code"]}
                {tabCode["description"]}
                
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