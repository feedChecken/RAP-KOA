var getData = {
  getUserProject: function(app) {
    // this.body = this.models
    return new Promise(function(resolve, reject) {
      app.orm.query('SELECT a.id,a.name,a.update_time as \'update\',a.introduction as intro,b.name as owner FROM tb_project as a INNER JOIN tb_user as b ON a.user_id=b.id WHERE b.id=1;').spread(function(res, metadata) {
        resolve(res);
      });
    });

  },
  getUserJoinProject: function(app) {
    return new Promise(function(resolve, reject) {
      app.models.User.findOne({
        where: {
          id: 1
        },
        include: [
          app.models.Project
        ]
      }).then(function(res) {
        var ret = [];
        res.Projects.forEach(function(val) {
          try{
            var data = JSON.parse(val.project_data);
            val.owner = data.user;
          }catch(e){
            console.log(e);
          }
          ret.push(val.intro);
        });
        resolve(ret);
      });
    });
  }
};
module.exports = function*(app, apiname) {
  var data = yield getData[apiname](app);
  return data;
};
