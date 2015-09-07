var Sequelize = require('sequelize');
var user = {
  id: {
    type: Sequelize.INTEGER(10),
    notNull: true,
    primaryKey: true
  },
  account: Sequelize.STRING(32),
  password: Sequelize.STRING(128),
  name: Sequelize.STRING(256),
  email: Sequelize.STRING(256),
  create_date: Sequelize.DATE,
  is_locked_out: Sequelize.INTEGER(1),
  is_hint_enabled: Sequelize.INTEGER(1),
  last_login_date: Sequelize.DATE,
  incorrect_login_attempt: Sequelize.INTEGER(10),
  realname: Sequelize.STRING(128),
  emp_id: Sequelize.STRING(128)
};
var option = {
  tableName: 'tb_user',
  createdAt: false,
  updatedAt: 'last_login_date',
  getterMethods: {
    getName: function() {
      return this.name;
    }
  }
};
module.exports = function(se) {
  se.define('User', user, option)
};
