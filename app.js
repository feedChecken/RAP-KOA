process.env.NODE_ENV = 'development';
//================引入主模块=================
var koa = require('koa');
//引入日志模块
var logger = require('koa-logger');
//引入路由模块
//引入静态文件处理
var serve = require('koa-static');
//引入模板引擎
var jade = require('koa-jade');
//引入body parse
var bodyParser = require('koa-body-parser');
//引入session
var session = require('koa-session');
//引入querystring Parse
var queryString = require('qs');


var app = koa();

//===============引入自定义模块===============
//引入路由管理
var router = require('./router/route');

//================引入配置文件================
var config = require('./config/serverConfig');

//include config
//generate application
app.use(logger());
//parse static file
app.use(serve(__dirname + '/public'));
app.use(router.routes());
//parse Url query string
// app.use(function*(next){
  // this.qs = queryString.parse(this.querystring);
  // yield next;
// });
//parse request
// app.use(bodyParser());
//set session secret
// app.keys = config.secret;
//use session
// app.use(session(app));

//引入路由规则

app.listen(config.port || 3000);

//开发环境
var webpackServer = require('./config/webpackServer');
if(process.argv[2] == 'dev'){
  webpackServer(app);
};
