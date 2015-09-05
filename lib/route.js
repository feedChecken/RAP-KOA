var router = require('koa-router')();
var views = require('co-views');
var render = views(process.cwd() + '/views', {
  ext: 'jade'
});
router.get('/:file', function*(next) {
  this.body = yield render('./'+this.params.file);
  yield next;
})
module.exports = router;
