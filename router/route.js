var router = require('koa-router')();
var views = require('co-views');
var render = views(__dirname + '/../views', {
  ext: 'jade'
});
var api = require('./api');

router.get('/', function*(next) {
  console.log(this);
  this.body = yield render('./home');
});

router.get('/:path', function*(next){
  this.body = yield render('./'+this.params.path);
});

router.get('/api/:api', function*(next){
  this.body = yield api(this);
});








module.exports = router;
