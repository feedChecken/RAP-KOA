import React from "react";
import $ from "jquery";
import moment from "moment";
import RD from "react-dom";
moment.locale('zh-cn');
class ProjectList extends React.Component{
  render() {
      return (
        <ul>
          {this.props.data.map(function (val, ind) {
            return (
              <li className="projectBox" key={ind}>
                <div className="projectTitle">{val.name}</div>
                <div className="projectIntro">{val.intro}</div>
                <div className="projectUpdate">{moment(val.update).fromNow()}</div>
                <div className="projectTools">
                  <i className="anticon anticon-edit"></i>
                  <i className="anticon anticon-link"></i>
                  <a href="/project">
                    <i className="anticon anticon-line-chart"></i>
                  </a>
                  <i className="anticon anticon-delete"></i>
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
}
$(function() {
  $.ajax({
    url: '/api/getUserJoinProject',
    success: function(data) {
      RD.render(<ProjectList data={data} />, document.getElementById("userJoinProject"));
    }
  });
  $.ajax({
    url: '/api/getUserProject',
    success: function(data) {
      RD.render(<ProjectList data={data} />, document.getElementById("userProject"));
    }
  });
});
