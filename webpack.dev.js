const path = require('path')  
const webpack = require('webpack')
const HtmlWebpackPlugin= require('html-webpack-plugin')

module.exports={
	entry: "./src/client/index.js",
	mode: "development",
	module:{
		rules:[
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use:{
					loader: "babel-loader",
					options: {
							presets: ['@babel/preset-env'],
					}
				},
			},
			{
				test: /\.css$/,
				use:['style-loader','css-loader']
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/client/views/index.html'
		})
	],
}