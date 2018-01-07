var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var libraryName = '[name]';
var plugins = [], outputFile;


module.exports = (env) => {

	if (env.env === 'build') {
		plugins.push(new UglifyJsPlugin({ minimize: true }));
		outputFile = libraryName + '.min.js';
	} else {
		outputFile = libraryName + '.js';
	}

	return {
		entry: {
			'veams': __dirname + '/src/ts/veams.ts',
			'veams-core': [__dirname + '/src/ts/generics/core.ts'],
			'common/component': [__dirname + '/src/ts/common/component.ts'],
			'common/base': [__dirname + '/src/ts/common/base.ts'],
			'services/http': __dirname + '/src/ts/services/http.ts'
		},
		devtool: 'inline-source-map',
		output: {
			path: path.resolve(__dirname, 'lib'),
			filename: outputFile,
			library: [libraryName, '[name]'],
			libraryTarget: 'umd',
			umdNamedDefine: true
		},
		module: {
			rules: [
				{
					test: /(\.tsx|\.ts|\.js)$/,
					loader: 'ts-loader',
					exclude: /(node_modules|bower_components)/
				}
			]
		},
		plugins: plugins,
		resolve: {
			extensions: ['.ts', '.js']
		}
	};
}
