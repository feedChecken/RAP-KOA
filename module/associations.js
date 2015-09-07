// 加载表与表之间的依赖
module.exports = function(models) {
  // 定义用户 `User` 和 项目 `Project` 表之间的关系
  console.log(models);
  //获取所有的表
  var User = models.User;
  var Project = models.Project;
  var Pau = models.Pau;
  User.belongsToMany(Project, {
    through: Pau,
    foreignKey: 'user_id'
  });
  Project.belongsToMany(User, {
    through: Pau,
    foreignKey: 'project_id'
  });
}
