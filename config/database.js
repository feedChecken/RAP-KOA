var Sequelize = require('sequelize');
var config = require('./serverConfig');
var dbOption = config.dbOption;
var se = new Sequelize('rap_db',dbOption.user,dbOption.password,{
  host : dbOption.host,
  dialect : dbOption.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})
var User = se.define('User',{
  id : Sequelize.INTEGER,
  account : Sequelize.STRING,
  password : Sequelize.STRING,
  name : Sequelize.STRING,
  email : Sequelize.STRING,
  create_date : Sequelize.DATE,
  is_locked_out : Sequelize.INTEGER,
  is_hint_enabled : Sequelize.INTEGER,
  last_login_date : Sequelize.DATE,
  incorrect_login_attempt : Sequelize.INTEGER,
  realname : Sequelize.STRING
},{
  tableName : 'tb_user',
  createdAt: false,
  updatedAt: 'last_login_date'
})
var abc = User.findAll({
  where : {
    id : 1
  }
}).then(function(res){
  console.log(res);
})
