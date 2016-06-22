/**
Copyright 2016
William Joel Gardner
**/

// TODO: use the actual ../client/webpack.config.js file
var webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    extractTextPlugin = require("extract-text-webpack-plugin"),
    compiler = webpack({
        entry: ['../client/assets/js/init.js', '../client/assets/style/sass/baseline.scss'],
        output: {
            path: __dirname + '/client/assets/',
            filename: 'bundle.js'
        },
        module: {
            loaders: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['react', 'es2015']
                }
            }, {
                test: /\.scss$/,
                loader: extractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            }]
        },
        plugins: [
            new extractTextPlugin('style/baseline.css', { allChunks: true })
        ]
    });


// create the server
var devServer = new WebpackDevServer(compiler, {
    contentBase : '../client',
    proxy : {
        '/graphql' : 'http://localhost:9001'
    },
    publicPath : '/assets',
    stats : {
        colors : true
    }
});

devServer.listen(9002);
console.log("The Webpack Dev Server is running.")
