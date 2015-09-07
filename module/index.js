module.exports = function(se) {
  var initList = [];
  //添加ORM的模块到加载队列
  initList.push('User');
  initList.push('Project');


  // 加载中间表
  initList.push('Project_and_User');
  // 加载ORM模块
  initList.forEach(function(val) {
    require("./" + val)(se);
  });

  // 加载关系
  require('./associations')(se.models);
}
