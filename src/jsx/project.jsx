import antd from 'antd';
import $ from 'jquery';
import React from 'react';
import render from 'react-dom';
React.render = render.render;
var Select = antd.Select;
var Option = Select.Option;
var Menu = antd.Menu;
var Tree = antd.Tree;
var TreeNode = Tree.TreeNode;
function handleChange(value) {
  console.log('selected ' + value);
}

class ModuleTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props["data-module"];
  }
  render () {
    return (
      <div>
        <Tree defaultExpandAll={false}>
          <TreeNode title="leaf"/>
          {this.state.pageList.map(function(val, ind) {
            console.log(val);
            return (
              <TreeNode title={val.name} key={ind}/>
            );
          })}
        </Tree>

      </div>
    );
  }
}
class Topbar extends React.Component {
  constructor(props) {
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
  render () {
    return(
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
}

class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      moduleList: this.props.moduleList
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick (e) {
    console.log(e.key);
    this.setState({current: e.key.replace('module', '')});
  }
  render () {
    return(
      <div>
        <Menu mode="horizontal" onClick={this.handleClick}>
          {this.props.moduleList.map(function(val, ind) {
            return (
              <Menu.Item key={"module" + ind}>
                {val.name}
              </Menu.Item>
            );
          })}
        </Menu>
        <ModuleTree data-module={this.state.moduleList[this.state.current]}></ModuleTree>
      </div>
    );
  }
}

function initProject(id) {
  $.ajax({
    url: '/api/getProject',
    success: function(data) {
      var da;
      if (data.project_data[0] === "{") {
        da = eval("(" + data.project_data + ")");
      }
      console.log(da);
      React.render(React.createElement(ProjectDetail, da), document.getElementById('projectDetail'));
    }
  });
}

$(function() {
  React.render(React.createElement(Topbar), document.getElementById('topbar'));
  initProject(2);
});
