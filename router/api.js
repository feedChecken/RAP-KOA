var getData = {
  getUserProject: function(app) {
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
        });
        resolve(ret);
      });
    });
  },
  getUserJoinProject : function(app){
    return new Promise(function(resolve, reject){
       app.orm.query('SELECT a.name as owner,b.id,b.name,b.update_time as \'update\',b.introduction as intro FROM tb_user as a INNER JOIN tb_project as b where a.id =1').spread(function(res,metadata){
         resolve(res);
       });
    });
  }
};
module.exports = function*(app, apiname) {
  var data = yield getData[apiname](app);
  return data;
};
