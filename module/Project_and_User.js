var Sequelize = require('sequelize');
var Pau = {
  project_id: {
    type: Sequelize.INTEGER(10),
    notNull: true
  },
  user_id: {
    type: Sequelize.INTEGER(10),
    notNull: true
  },
  access_level: {
    type: Sequelize.INTEGER(10),
    notNull: true
  }
};
var option = {
  tableName: 'tb_project_and_user',
  createdAt: false,
  updatedAt: false
};
module.exports = function(se) {
  se.define('Pau', Pau, option)
};
