var Sequelize = require('sequelize');
var Project = {
  id: {
    type: Sequelize.INTEGER(10),
    notNull: true,
    primaryKey: true
  },
  version: Sequelize.STRING(128),
  name: Sequelize.STRING(128),
  create_date: Sequelize.DATE,
  user_id: Sequelize.INTEGER(10),
  introduction: Sequelize.TEXT,
  workspace_mode: Sequelize.INTEGER(10),
  stage: Sequelize.INTEGER(10),
  project_data: Sequelize.TEXT,
  stage: Sequelize.INTEGER(10),
  group_id: Sequelize.INTEGER(10),
  related_ids: Sequelize.STRING(128),
  update_time: Sequelize.DATE,
  mock_num: Sequelize.INTEGER(10)
};
var option = {
  tableName: 'tb_project',
  createdAt: false,
  updatedAt: 'update_time',
  getterMethods: {
    getName: function() {
      return this.name;
    }
  }
};
module.exports = function(se) {
  se.define('Project', Project, option)
};
