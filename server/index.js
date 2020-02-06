import express from 'express'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
import proxy from 'express-http-proxy'
import routeHandler from './middlewares/routeHandler'
import apiHandle from './api/dataHandle'

const app = express()
// 设置ejs渲染html
app.engine('.html', require('ejs').__express)
// 设置ejs 渲染引擎
app.set('view engine', 'html')
//设置 ejs 渲染模版路径
app.set('views', './server/views')

// 设置express静态文件挂载目录
app.use(express.static('public'))
app.use(express.static('/'));

// 创建一个写文件流，并且保存在logs的tff_mobile_access.log文件中
var accessLogStream = fs.createWriteStream(path.resolve('server', 'logs/tff_mobile_access.log'), { flag: 'a' });
// 使用morgan记录日志，日志格式为 combined
app.use(morgan('combined', { stream: accessLogStream }));
// app.use(morgan('combined'));
/*
* express-http-proxy 做请求代理
* 将/api 请求代理到 https://app.toursforfun.com
*/
// http://trest.qa6.tff.com
app.use('/api', proxy('http://trest.qa6.tff.com', {
    proxyReqPathResolver: function (req) {
        // console.log(req.url, '!!!!!!!!!!!!!!!!!!!!')
     return '/api' + req.url
    },
    userResDecorator: apiHandle
}));

// app.use('/', proxy('http://trest.qa6.tff.com', {
//     proxyReqPathResolver: function (req) {
//         console.log('!!!!!!!!!!!!', req.url)
//      return '/api' + req.url
//     }
//     // userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
//     //     console.log('request, ===================--------------------')
//     //     let Node_data = JSON.parse(proxyResData.toString('utf8'));
//     //     Node_data.data.push({ name: '测试币', symbol: 'L', type: 'Lan' })
//     //     return JSON.stringify(Node_data);
//     // }
// }));

/**
 * routeHandler 中间件
 * 路由、组件匹配
 * loadData预加载数据
 * 数据注水、数据脱水
 */
app.use(routeHandler)

app.get('*', () => {
    // console.log('任意 请求 进来', req.url)
})

// 监听3000 端口
app.listen(3000, () => {
    console.log('node端口，启动成功，端口3000')
})
