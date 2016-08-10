'use strict';
 
import React from 'react';
import FacebookLogin from 'react-facebook-login';
 
class MyComponent extends React.Component {
  constructor(props) {
      super(props);
  };
 
  responseFacebook = (response) => {
    console.log(response);
  };
 
  render() {
    return (
      <FacebookLogin
        appId="1088597931155576"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook} 
      />
    )
  }
}
 
export default MyComponent;