import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
	Alert,
	Networking
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
	AccessToken
} = FBSDK;

var FacebookLogin = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <LoginButton
          onLoginFinished={
            (error, result) => {
							if (error) {
								Alert.alert('알림',	'문제발생!',
									[{text: '확인', onPress: () => console.log('OK Pressed')}]
								);
              } else if (result.isCancelled) {
                Alert.alert('알림',	'로그인이 취소됨.',
									[{text: '확인', onPress: () => console.log('OK Pressed')}]
								);
              } else {
								this.getToken();
              }
            }
          }
          onLogoutFinished={
						() => {
							Alert.alert(
								'알림',
								'로그아웃 되었습니다.',
								[{text: '확인', onPress: () => console.log('OK Pressed')}]
							)
						}
					}/>
      </View>
    );
  },
	
	getToken: function() {
		AccessToken.getCurrentAccessToken().then(
			(data) => {
				let token = data.accessToken.toString();
				this.getUserInfo(token);
			}
		);
	},
	
	getUserInfo: function(token) {		
		fetch('https://graph.facebook.com/me?access_token=' + token)
		.then((response) => response.json())
		.then((responseJson) => {
			let userName = responseJson.name;
			this.getLoginCount(token, userName);
		})
		.catch((error) => {
			console.error(error);
		});
	},
	
	getLoginCount: function(token, userName) {
		fetch('https://fblogincounterdemo.herokuapp.com/login?token=' + token)
		.then((response) => response.json())
		.then((responseJson) => {
			let count = responseJson.count;
			Alert.alert(
				'알림',
				userName + '님은 오늘 ' + count + '번 로그인했네요~ ^^',
				[{text: '확인', onPress: () => console.log('OK Pressed')}]
			)
		})
		.catch((error) => {
			console.error(error);
		});
	}
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('FacebookLogin', () => FacebookLogin);