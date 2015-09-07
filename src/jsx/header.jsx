import React from 'react';
import antd from 'antd';
var Menu = antd.Menu;
var SubMenu = Menu.SubMenu;
var Menu = antd.Menu;
var SubMenu = Menu.SubMenu;
var Select = antd.Select;
var Option = Select.Option;
var Dropdown = antd.Dropdown;
import $ from 'jquery';
let abc = $;
var App = React.createClass({
  getInitialState() {
    return {
      current: 'mail'
    }
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  },
  render() {
    return <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={[this.state.current]}>
        <Menu.Item key="mail">
          <i className="anticon anticon-home"></i>主页
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/team">
            <i className="anticon anticon-smile"></i>团队
          </a>
        </Menu.Item>
        <Menu.Item key="doc">
          <i className="anticon anticon-folder-open"></i>文档
        </Menu.Item>
        <SubMenu title={<span><i className="anticon anticon-user"></i>团队</span>}>
          <Menu.Item key="setting:1">测试团队</Menu.Item>
          <Menu.Item key="setting:2">选项2</Menu.Item>
          <Menu.Item key="setting:3">选项3</Menu.Item>
          <Menu.Item key="setting:4">选项4</Menu.Item>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="###" target="_blank"><i className="anticon anticon-line-chart"></i>测试</a>
        </Menu.Item>
      </Menu>
  }
});

var Search = React.createClass({
  getInitialState() {
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
    return <Select combobox onChange={this.handleChange} searchPlaceholder="搜索..." style={{
        width: 200
      }}>
        {this.state.options}
      </Select>;
  }
});

var User = React.createClass({
  render: function() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="username">
              登陆
        </Menu.Item>
        <Menu.Item key="reg">
          注册
        </Menu.Item>
      </Menu>
    )
  }
})
React.render(<App/>, document.getElementById('nav'));
React.render(<Search/>, document.getElementById('searchBar'));
React.render(<User/>, document.getElementById('user'));
