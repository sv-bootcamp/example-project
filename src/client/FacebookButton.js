'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FacebookButton = function (_React$Component) {
   _inherits(FacebookButton, _React$Component);

   function FacebookButton(props) {
      _classCallCheck(this, FacebookButton);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FacebookButton).call(this, props));

      _this.FB = props.fb;

      _this.state = {
         message: ""
      };

      return _this;
   }

   _createClass(FacebookButton, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
         this.FB.Event.subscribe('auth.logout', this.onLogout.bind(this));
         this.FB.Event.subscribe('auth.statusChange', this.onStatusChange.bind(this));
      }
   }, {
      key: 'onStatusChange',
      value: function onStatusChange(response) {
         console.log(response);
         var self = this;

         if (response.status === "connected") {
            this.FB.api('/me', function (response) {
               var message = "Welcome " + response.name;
               self.setState({
                  message: message
               });
            });
         }
      }
   }, {
      key: 'onLogout',
      value: function onLogout(response) {
         this.setState({
            message: ""
         });
      }
   }, {
      key: 'render',
      value: function render() {
         return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('div', {
               className: 'fb-login-button',
               'data-max-rows': '1',
               'data-size': 'xlarge',
               'data-show-faces': 'false',
               'data-auto-logout-link': 'true'
            }),
            _react2.default.createElement(
               'div',
               null,
               this.state.message
            )
         );
      }
   }]);

   return FacebookButton;
}(_react2.default.Component);

exports.default = FacebookButton;
;