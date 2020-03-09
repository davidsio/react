import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

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

    state = {
    uniqueValue: 1
  }
  forceRemount = () => {
    this.setState(({ uniqueValue }) => ({
      uniqueValue: uniqueValue + 1
    }));
  }




  render() {

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
                
                {tabCode["code"]}
                {tabCode["description"]}
                
                </Text>

                <Button
      title="Actualiser"
      titleStyle={{fontSize: 15}}
      onPress={this.forceRemount} />
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