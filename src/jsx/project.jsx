import antd from 'antd';
import $ from 'jquery';
import React from 'react';
var Select = antd.Select;
var Option = Select.Option;

function handleChange(value) {
  console.log('selected ' + value);
}

let Topbar = React.createClass({getInitialState() {
    return {
      options: []
    };
  },
  handleChange(value) {
    var options;
    if (!value || value.indexOf('@') >= 0) {
      options = [];
    } else {
      options = [
        'gmail.com', '163.com', 'qq.com'
      ].map(function(domain) {
        var email = value + '@' + domain;
        return <Option key={email}>{email}</Option>;
      });
    }
    this.setState({
      options: options
    });
  },
  render() {
    return (
      <div>
        <Select combobox onChange={this.handleChange} searchPlaceholder="请输入账户名" style={{
          width: 200
        }}>
          {this.state.options}
        </Select>
        <button className="ant-btn ant-btn-primary ant-btn-lg">
          <i className="anticon anticon-edit"></i>编辑</button>
        <button className="ant-btn ant-btn-lg">
          <i className="anticon anticon-book"></i>版本</button>
        <button className="ant-btn ant-btn-lg">
          <i className="anticon anticon-smile"></i>Mock</button>
        <button className="ant-btn ant-btn-lg">
          <i className="anticon anticon-setting"></i>配置</button>
      </div>
    );
  }
});

function initProject(id) {
  $.ajax({
    url: '/api/getProject',
    success: function(data) {
      let da = JSON.parse(data.project_data);
      console.log(da);
    }
  });
}

$(function() {
  React.render(React.createElement(Topbar), document.getElementById('topbar'));
  initProject(2);
});
