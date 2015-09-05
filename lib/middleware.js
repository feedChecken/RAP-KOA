'use strict';

var join = require('path').join;
var assign = require('object-assign');

module.exports = function (compiler) {

  return require('koa-webpack-dev-middleware')(compiler, {
    publicPath: '/'
  });
};
