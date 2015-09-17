var router = require('koa-router')();
var views = require('co-views');
var render = views(__dirname + '/../views', {
  ext: 'jade'
});
var api = require('./api');

router.get('/', function*(next) {
  this.body = yield render('./home');
});
router.get('/team', function*(next){
  this.body = yield render('./team');
});
router.get('/project', function*(next){
  this.body = yield render('./project');
});

// router.get('/:path', function*(next){
//   this.body = yield render('./'+this.params.path);
// });
router.get('/api/:api', function*(next){
  this.body = yield api(this,this.params.api);
});

module.exports = router;
