import R from "react";
import $ from "jquery";
import moment from "moment";
moment.locale('zh-cn');
let ProjectList = R.createClass({render() {
    return (
      <ul>
        {this.props.data.map(function (val, ind) {
          return (
            <li className="projectBox">
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
});

$(function() {
  $.ajax({
    url: '/api/getUserJoinProject',
    success: function(data) {
      R.render(R.createElement(ProjectList, {
        data: data
      }), document.getElementById("userJoinProject"));
    }
  });
  $.ajax({
    url: '/api/getUserProject',
    success: function(data) {
      R.render(R.createElement(ProjectList, {
        data: data
      }), document.getElementById("userProject"));
    }
  });
});
