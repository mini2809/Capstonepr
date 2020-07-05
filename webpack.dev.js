const path = require('path')  
const webpack = require('webpack')
const HtmlWebpackPlugin= require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports={
	entry: "./src/client/index.js",
	mode: "development",
	devtool: 'inline-source-map',
	stats: 'verbose',
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
				test: /\.scss$/,
				use:['style-loader','css-loader','sass-loader']
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use:['file-loader'],
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/client/views/index.html'
		}),
		new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        
	],
}