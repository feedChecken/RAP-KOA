var getData = {
  getUserProject : function*(app){
    // this.body = this.models
    app.models.User.findAll({
      include : [app.models.Pau],
      where : {
        id : 1
      }
    }).then(function(res){
      console.log(res);
      // console.log(res);
      // yield res;
    })
    return {username : 'nunn'};
  }
}

module.exports = function*(app,apiname){
  var data = yield getData[apiname](app);
  return data;
}
