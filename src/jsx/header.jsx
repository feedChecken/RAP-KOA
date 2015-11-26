import React from 'react';
import antd from 'antd';
import rd from 'react-dom';
var Menu = antd.Menu;
var Menu = antd.Menu;
var SubMenu = Menu.SubMenu;
var Select = antd.Select;
var Option = Select.Option;
var Dropdown = antd.Dropdown;
import $ from 'jquery';
let abc = $;

class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      current : 'mail'
    }
  }
  handleClick(e) {
    console.log('click ', e);
    this.setState({current: e.key});
  }
  render() {
    return (
      <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={[this.state.current]}>
        <Menu.Item key="mail">
          主页
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/team">
            团队
          </a>
        </Menu.Item>
        <Menu.Item key="doc">
          文档
        </Menu.Item>
        <SubMenu title={<span>团队</span>}>
          <Menu.Item key="setting:1">测试团队</Menu.Item>
          <Menu.Item key="setting:2">选项2</Menu.Item>
          <Menu.Item key="setting:3">选项3</Menu.Item>
          <Menu.Item key="setting:4">选项4</Menu.Item>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="###" target="_blank">测试</a>
        </Menu.Item>
      </Menu>
    );
  }
}

class Search extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      options: []
    }
  }
  handleChange (value) {
    var options;
    if (!value || value.indexOf('@') >= 0) {
      options = [];
    } else {
      options = ['gmail.com', '163.com', 'qq.com'].map(function(domain) {
        var email = value + '@' + domain;
        return <Option key={email}>{email}</Option>;
      });
    }
    this.setState({options: options});
  }
  render () {return <Select combobox onChange={this.handleChange} searchPlaceholder="搜索..." style={{
  width: 200
  }}>
    {this.state.options}
  </Select>;}
}
class User extends React.Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="username">
          登陆
        </Menu.Item>
        <Menu.Item key="reg">
          注册
        </Menu.Item>
      </Menu>
    );
  }
}
rd.render(<App/>, document.getElementById('nav'));
rd.render(<Search/>, document.getElementById('searchBar'));
rd.render(<User/>, document.getElementById('user'));
