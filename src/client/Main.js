'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FacebookButton = require('./FacebookButton');

var _FacebookButton2 = _interopRequireDefault(_FacebookButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_react2.default.render(_react2.default.createElement(_FacebookButton2.default, { fb: FB }), document.getElementById('facebook-login'));