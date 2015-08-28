var style = require('./style.css');
import React from 'react';
import { Datepicker, message } from 'antd';
var com = require('./js/content.js');

var App = React.createClass({
  getInitialState() {
    return {
      date: ''
    };
  },
  handleChange(value) {
    this.setState({
      date: value
    });
  },
  notice() {
    message.info(this.state.date.toString());
  },
  render() {
    return <div>
      <Datepicker onSelect={this.handleChange} />
      <button className="ant-btn ant-btn-primary" onClick={this.notice}>显示日期</button>
    </div>;
  }
});

React.render(<App />, document.body);
