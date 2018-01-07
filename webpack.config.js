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

var config = {
	entry: {
		'veams': __dirname + '/src/js/veams.ts',
		'veams-core': [__dirname + '/src/ts/generics/core.ts'],
		'common/component': [__dirname + '/src/ts/common/component.ts'],
		'common/base': [__dirname + '/src/ts/common/base.ts'],
		'services/http': __dirname + '/src/ts/services/http.js'
	},
    devtool: 'inline-source-map',
	output: {
		path: __dirname + '/lib',
		filename: outputFile,
		library: [libraryName, '[name]'],
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		loaders: [
			{
				test: /(\.tsx|\.ts)$/,
				loader: 'ts-loader',
				exclude: /(node_modules|bower_components)/
			}
		]
	},
	resolve: {
		root: path.resolve('./src'),
		extensions: ['', '.ts']
	},
	plugins: plugins
};

module.exports = config;
