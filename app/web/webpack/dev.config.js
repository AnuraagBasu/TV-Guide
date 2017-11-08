const path = require( 'path' );
const webpack = require( 'webpack' );

module.exports = {
	entry: path.join( __dirname, '../../../index.web' ),
	output: {
		path: path.join( __dirname, '../' ),
		filename: 'bundle.js',
		publicPath: '/',
	},
	resolve: {
		extensions: [ '.js', '.jsx', '.json', '*' ]
	},
	module: {
		rules: [ {
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader',
			options: {
				presets: [ 'react', 'es2015' ]
			}
		},
		{
			test: /\.scss$/,
			use: [
				'style-loader',
				'css-loader',
				'sass-loader'
			]
		}]
	},
	plugins: [
		new webpack.DefinePlugin( {
			'process.env': {
				NODE_ENV: JSON.stringify( 'dev' )
			},
		} ),
	]
};