const koa        = require('koa');            // koa framework
const path = require('path');
const router = require('koa-router')(); // router middleware for koa

const ip = require('ip');
const IPAddress = ip.address();

const app =new koa();


const static_koa = require('koa-static');
// 配置静态web服务的中间件
app.use(static_koa(path.resolve(__dirname+'/www')));


router.get('/ssh', function(ctx) {

    ctx.response.redirect('http://'+IPAddress+':2222/ssh/host/192.168.0.10');
});
app.use(router.routes());

app.listen(3000, () => {
    console.log('listening on port 3000');
});
//
var config = require('./webssh2/server/app').config;
var server = require('./webssh2/server/app').server;

server.listen({ host: config.listen.ip, port: config.listen.port
})
//
// console.log('WebSSH2 service listening on ' + config.listen.ip + ':' + config.listen.port)

// server.on('error', function (err) {
//     if (err.code === 'EADDRINUSE') {
//         config.listen.port++;
//         console.warn('WebSSH2 Address in use, retrying on port ' + config.listen.port)
//         setTimeout(function () {
//             server.listen(config.listen.port)
//         }, 250)
//     } else {
//         console.log('WebSSH2 server.listen ERROR: ' + err.code)
//     }
// });
