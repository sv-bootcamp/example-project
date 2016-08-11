import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import MyCounter from '../shared/components/MyCounter'
import counter from '../shared/reducers'

const store = createStore(counter)
const rootEl = document.getElementById('root')


function dispatchCount(num, username) {
	for(var i=0; i<num; i++) {
		store.dispatch({ type: 'ADD_VISIT_COUNT', username: username })
	}
}

function render() {	
  ReactDOM.render(
  	<h1>{store.getState()}</h1>
    ,
    rootEl  
  )
}

// render()
store.subscribe(render)


//facebook api
function statusChangeCallback(response) {
console.log('statusChangeCallback');
console.log(response);
// The response object is returned with a status field that lets the
// app know the current login status of the person.
// Full docs on the response object can be found in the documentation
// for FB.getLoginStatus().
if (response.status === 'connected') {
  // Logged into your app and Facebook.
  testAPI();
  var accessToken = response.authResponse.accessToken;
} else if (response.status === 'not_authorized') {
  // The person is logged into Facebook, but not your app.
  document.getElementById('status').innerHTML = 'Please log ' +
    'into this app.';
} else {
  // The person is not logged into Facebook, so we're not sure if
  // they are logged into this app or not.
  document.getElementById('status').innerHTML = 'Please log ' +
    'into Facebook.';
}
}

function checkLoginState() {
FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});
}

window.fbAsyncInit = function() {
FB.init({
appId      : '1666283467025544',
cookie     : true,  // enable cookies to allow the server to access 
                    // the session
xfbml      : true,  // parse social plugins on this page
version    : 'v2.5' // use graph api version 2.5
});


FB.getLoginStatus(function(response) {
statusChangeCallback(response);    
});

};

// Load the SDK asynchronously
(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/en_US/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
console.log('Welcome!  Fetching your information.... ');
FB.api('/me', function(response) {
  console.log('Successful login for: ' + response.name);
  var username = response.name;

  var count = localStorage.getItem('count');
  count++;
  localStorage.setItem('count', count);
  
  document.getElementById('status').innerHTML =
    'Thanks for logging in, ' + response.name + '!';

  // document.getElementById('root').innerHTML = count;
  dispatchCount(count, username);
  render()
});
}