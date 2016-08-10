'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FacebookButton = require('./FacebookButton');

var _FacebookButton2 = _interopRequireDefault(_FacebookButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HelloWorld = _react2.default.createClass({
  displayName: 'HelloWorld',

  render: function render() {
    return _react2.default.createElement(_FacebookButton2.default, { fb: FB });
  }
});

setInterval(function () {
  ReactDOM.render(_react2.default.createElement(HelloWorld, { date: new Date() }), document.getElementById('fb-login-button'));
}, 500);