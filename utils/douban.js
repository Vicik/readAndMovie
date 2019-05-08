var http = require('http')
var request = require('request')

// 1. 创建 Server
var server = http.createServer()

server.on('request', function (req, res) {
	 res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});//设置response编码为utf-8
  var url = req.url
   console.log("url:"+url);
   //发送请求豆瓣获取json数据
    request({
        url: "https://api.douban.com/"+url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/xml",
        },
        body: ""
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // 请求成功的处理逻辑
			res.write(JSON.stringify(body))
			res.end()
        }
    });

})

// 3. 绑定端口号，启动服务
server.listen(3000, function () {
  console.log('running...')
})