var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: ['./assets/js/init.js', './assets/style/sass/baseline.scss'],
    output: {
        path: __dirname + "/assets/",
        filename: 'js/bundle.js'
    },
    module: {
        loaders: [{
        	test: __dirname,
            loader: 'babel-loader',
            exclude: /(node_modules|bower_components)/,
            query: {
				presets: ['react', 'es2015']
			}
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
        }]
    },
    plugins: [
        new ExtractTextPlugin("style/baseline.css", { allChunks: true })
    ]
};
