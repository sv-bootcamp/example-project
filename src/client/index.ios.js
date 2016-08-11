/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Networking, 
  AlertIOS, 
  Text,
  View
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;


var lab1 = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) 
              {
                this.showAlert('Err', () => console.log('Pressed'));
              } 
              else if (result.isCancelled) 
              {
                this.showAlert('Rejected', () => console.log('Pressed'));
              } 
              else 
              {
                this.getToken();
              }
            }
          }
          onLogoutFinished = {
            () => {
              let msg = 'Logout.';
              this.showAlert(msg, () => console.log('Pressed'));
            }
          }/>
      </View>
    );
  },

  getToken: function() {
    AccessToken.getCurrentAccessToken.then(
      (data) => {
        let token = data.accessToken.toString();
        this.getUserInfo(token);
      }
    );
  },

  loginCount: function(token, userName) {
    fetch('https://facebooklogin1.herokuapp.com/login?token=' + token)
    .then((response) => response.json())
    .then((responseJson) => {
      let count = responseJson.count;
      let msg = 'You have visited ' + count + 'times';
      this.showAlert(msg, () => console.log('Pressed'));
    })
    .catch((error) => {
      console.error(error);
    });
  },

});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('lab1', () => lab1);
