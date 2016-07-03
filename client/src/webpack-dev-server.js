/**
Copyright 2016
William Joel Gardner
**/

var webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    extractTextPlugin = require("extract-text-webpack-plugin"),
    webpackConfig = require('./webpack.config'),
    compiler = webpack(webpackConfig);

var devServer = new WebpackDevServer(compiler, {
  contentBase : './assets',
  proxy : {
    '/graphql' : 'http://localhost:9001'
  },
  publicPath : '/',
  stats : {
    colors : true
  }
});

devServer.listen(9002);
console.log("The Webpack Dev Server is running.")
