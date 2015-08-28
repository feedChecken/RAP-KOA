var router = require('koa-router')();
var views = require('co-views');
var render = views(__dirname + '/../views', {
  ext: 'jade'
});
router.get('/', function*(next) {
  this.body = yield render('./home');
})
module.exports = router;
