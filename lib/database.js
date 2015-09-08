var Sequelize = require('sequelize');
var config = require('../config/serverConfig');
var dbOption = config.dbOption;
var ORM = require('../module');
var se = new Sequelize('rap_db',dbOption.user,dbOption.password,{
  host : dbOption.host,
  dialect : dbOption.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

ORM(se);
// var models = se.models;
// var abc = models.User.findAll({
//   where : {
//     id : 1
//   }
// }).then(function(res){
//   res.forEach(function(val,ind){
//     console.log(val.getName);
//   })
// })

console.log('/*******************/');
console.log('Database was loaded!');
console.log('/*******************/');

module.exports = se;
