import express from 'express';
import path from 'path';
import bodyParser from 'body-parser'

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware'; //小型Express服务器
import webpackHotMiddleware from 'webpack-hot-middleware'; //浏览器的无刷新更新
import webpackConfig from '../webpack.config.dev'; //webpack 配置文件

import users from './routes/users';

let app = express();

app.use(bodyParser.json());

app.use('/api/users',users);

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler,{
	hot:true,
	publicPath:webpackConfig.output.publicPath, //对应 webpack 配置文件中
	noInfo:true
}));
app.use(webpackHotMiddleware(compiler));

app.get('/*',(req,res) => {
	// res.send('hello world');
	res.sendFile(path.join(__dirname,'./index.html'));
});

app.listen(3000,()=> console.log('Running on localhost:3000'));