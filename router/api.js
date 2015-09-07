var getData = {
  getUserProject: function*(app) {
    // this.body = this.models
    return new Promise(function(resolve, reject) {
      app.models.Project.findAll({
        include : [app.models.User],
        where : {
          user_id : 1
        }
      }).then(function(res){
        console.log(res[0]);
        var arr = [];
        res.forEach(function(val){
          val.project_data = "";
          arr.push(val);
        })
        resolve(arr);
      })

      
    })
  }
}
module.exports = function*(app, apiname) {
  var data = yield getData[apiname](app);
  return data;
}
