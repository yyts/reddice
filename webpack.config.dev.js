import path from 'path';
import webpack from 'webpack';

export default{
	devtool:'eval-source-map',
	entry:[
		'webpack-hot-middleware/client',
		path.join(__dirname,'/client/index.js')
	],
	output:{
		path:'/',
		pablicPath:'/'
	},
	plugins:[
		new webpack.NoErrorsPlugin(), //允许错误不打断程序
		new webpack.optimize.OccurenceOrderPlugin(), //hash 相关???
		new webpack.HotModuleReplacementPlugin() //热模块，不需要刷新浏览器
	],
	module:{
		loaders:[
			{
				test: /\.js$/, //匹配要处理的文件
				include: [
					path.join(__dirname,'client'),
					path.join(__dirname,'server/shared/')
				], //要处理的目录
				loaders:[ 'react-hot','babel' ], //要使用的loader
				// exclude:[] //排除不处理的文件
			}
		]
	},
	resolve:{ //当require 的模块找不到时，添加后缀
		extentions:[ '', '.js' ]
	}
}