var getData = {
  getUserProject: function*(app) {
    // this.body = this.models
    return new Promise(function(resolve, reject){
      app.models.Project.findAll({
        where : {
          user_id : 1
        }
      }).then(function(res){
        var ret = [];
        res.forEach(function(val){
          ret.push(val.intro);
        })
        resolve(ret);
      })
    });
  },
  getUserJoinProject : function*(app){
    return new Promise(function(resolve, reject) {
      app.models.User.findOne({
        include : [app.models.Project],
        where : {
          id : 1
        }
      }).then(function(res){
        var ret = [];
        res.Projects.forEach(function(val){
          ret.push(val.intro);
        })
        resolve(ret);
      })
    })
  },
  testQuery : function*(app){
    return new Promise(function(resolve, reject){
       app.orm.query('SELECT * FROM tb_project LEFT JOIN (SELECT name FROM tb_user) ON tb_project.user_id=tb_user.id').spread(function(res,metadata){
         resolve(res);
       })
    });
  }
}
module.exports = function*(app, apiname) {
  var data = yield getData[apiname](app);
  return data;
}
