
//This is an example code to Scan QR code//
import React, { Component } from 'react';
//import react in our code.
import { Text, View, Linking, TouchableHighlight, PermissionsAndroid, Platform, StyleSheet, Button} from 'react-native';
// import all basic components
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
import AsyncStorage from '@react-native-community/async-storage';
import { Tile } from 'react-native-elements';
let nbDatas = 0;
let nbKey = '';
const saveCode = async (value) =>{
  try {
    getAllData()
    nbKey = nbDatas + "";
    nbDatas++;
    console.log(nbKey);
    await AsyncStorage.setItem(nbKey, value);
  } catch (e) {
    console.log(e);
  }
};

const getAllData = () =>{
  AsyncStorage.getAllKeys().then((keys) => {
    return AsyncStorage.multiGet(keys)
      .then((result) => {
        //nbDatas =  result;
      }).catch((e) =>{
        console.log(e);
      });
  });
}

//import CameraKitCameraScreen we are going to use.
export default class App extends Component {
static navigationOptions = {
    title: 'GoStyle QRCodeScanner',
    //Sets Header text of Status Bar
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
    };
  constructor() {
    super();
    this.state = {
      //variable to hold the qr value
      qrvalue: '',
      opneScanner: false,
    };
  }
  onOpenlink() {
    //Function to open URL, If scanned 
    Linking.openURL(this.state.qrvalue);
    //Linking used to open the URL in any browser that you have installed
  }
  onBarcodeScan(qrvalue) {
    //called after te successful scanning of QRCode/Barcode
    saveCode(qrvalue);
    this.setState({ qrvalue: qrvalue });
    this.setState({ opneScanner: false });
  }
  onOpneScanner() {
    var that =this;
    //To Start Scanning
    if(Platform.OS === 'android'){
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'Erreur',
              'message': 'L\'application à besoin d\'un accès à la caméra pour fonctionner.'
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            that.setState({ qrvalue: '' });
            that.setState({ opneScanner: true });
          } else {
            alert("Permission refusée");
          }
        } catch (err) {
          alert("Camera permission err",err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();
    }else{
      that.setState({ qrvalue: '' });
      that.setState({ opneScanner: true });
    }    
  }
  render() {
    const { navigate } = this.props.navigation;
    let displayModal;
    //If qrvalue is set then return this view
    if (!this.state.opneScanner) {
      return (
        <View style={styles.container}>
          <Tile
            imageSrc={require('../img/tile.png')}
            title=""
            featured
            activeOpacity={1}
                      />
            <Text style={styles.simpleText}>{this.state.qrvalue ? 'QR code scanné: '+this.state.qrvalue : ''}</Text>
            {this.state.qrvalue.includes("http") ? 
              <TouchableHighlight
                onPress={() => this.onOpenlink()}
                style={styles.button}>
                  <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Ouvrir le lien</Text>
              </TouchableHighlight>
              : null
            }
            <TouchableHighlight
              onPress={() => this.onOpneScanner()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                Scanner un QR code
                </Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => navigate('Promotions')}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                Promotions en cours
                </Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() =>  navigate('Historique')}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                Historique
                </Text>
            </TouchableHighlight>
        </View>
      );
    }

    
    return (
      <View style={{ flex: 1 }}>
        <CameraKitCameraScreen
          actions={{ leftButtonText: 'Annuler' }}
          onBottomButtonPressed={event => this.setState({ opneScanner: false })}
          showFrame={false}
          //Show/hide scan frame
          scanBarcode={true}
          //Can restrict for the QR Code only
          laserColor={'blue'}
          //Color can be of your choice
          frameColor={'yellow'}
          //If frame is visible then frame color
          colorForScannerFrame={'black'}
          //Scanner Frame color
          onReadCode={event =>
            this.onBarcodeScan(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2c3539',
    padding: 10,
    width:300,
    marginTop:16
  },
  heading: { 
    color: 'black', 
    fontSize: 24, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 30 
  },
  simpleText: { 
    color: 'black', 
    fontSize: 20, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 16
  }
});