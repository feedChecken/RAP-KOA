import antd from 'antd';
import $ from 'jquery';
import React from 'react';
var Select = antd.Select;
var Option = Select.Option;
var Menu = antd.Menu;

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

let ProjectDetail = React.createClass({
  getInitialState (){
    return {
      current : 1,
      moduleList : this.props.moduleList
    };
  },
  handleClick(e){
    this.setState({
      current : e.key.replace('module','')
    });
  },
  render (){
    return (
      <div>
        <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={[this.state.current]}>
          {this.props.moduleList.map(function(val,ind){
              return (
                <Menu.Item key={"module" + ind} >
                  {val.name}
                </Menu.Item>
                );
          })}
        </Menu>
        <div>{this.state.moduleList[this.state.current]}</div>
      </div>
    );
  }
});


function initProject(id) {
  $.ajax({
    url: '/api/getProject',
    success: function(data) {
      console.log(123);
      var da;
      if(data.project_data[0] === "{"){
        da = eval("(" + data.project_data + ")");
      }
      React.render(React.createElement(ProjectDetail,da),document.getElementById('projectDetail'));
      console.log(da);
    }
  });
}

$(function() {
  React.render(React.createElement(Topbar), document.getElementById('topbar'));
  initProject(2);
});
