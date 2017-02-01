var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;

var libraryName = '[name]';

var plugins = [], outputFile;

if (env === 'build') {
	plugins.push(new UglifyJsPlugin({minimize: true}));
	outputFile = libraryName + '.min.js';
} else {
	outputFile = libraryName + '.js';
}
// module.exports = {
// 	entry: {
// 		alpha: "./alpha",
// 		beta: "./beta"
// 	},
// 	output: {
// 		path: path.join(__dirname, "js"),
// 		filename: "MyLibrary.[name].js",
// 		library: ["MyLibrary", "[name]"],
// 		libraryTarget: "umd"
// 	}
// }
var config = {
	entry: {
		'veams': __dirname + '/src/index.js',
		'common/component': __dirname + '/src/common/component.js',
		'plugins/dom': __dirname + '/src/plugins/dom.js',
		'plugins/logger': __dirname + '/src/plugins/logger.js',
		'plugins/media-query-handler': __dirname + '/src/plugins/media-query-handler.js',
		'plugins/modules': __dirname + '/src/plugins/modules.js',
		'plugins/vent': __dirname + '/src/plugins/vent.js'
	},
	devtool: 'source-map',
	output: {
		path: __dirname + '/lib',
		filename: outputFile,
		library: [libraryName, "[name]"],
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		loaders: [
			{
				test: /(\.jsx|\.js)$/,
				loader: 'babel',
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /(\.jsx|\.js)$/,
				loader: "eslint-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		root: path.resolve('./src'),
		extensions: ['', '.js']
	},
	plugins: plugins
};

module.exports = config;
