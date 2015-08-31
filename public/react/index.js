'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

console.log(123);
var App = _react2['default'].createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      date: ''
    };
  },
  handleChange: function handleChange(value) {
    _antd.message.info('您选择的日期是: ' + value.toString());
    this.setState({
      date: value
    });
  },
  render: function render() {
    return _react2['default'].createElement(
      'div',
      { style: { width: 400, margin: '100px auto' } },
      _react2['default'].createElement(_antd.Datepicker, { onSelect: this.handleChange }),
      _react2['default'].createElement(
        'div',
        { style: { marginTop: 20 } },
        '期：',
        this.state.date.toString()
      )
    );
  }
});
_react2['default'].render(_react2['default'].createElement(App, null), document.querySelector("#abc"));
//# sourceMappingURL=index.js.map