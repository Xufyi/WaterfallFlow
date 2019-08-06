var http = require('http')
var url = require('url')
var fs = require('fs')
//引入解析字符串对象
var qs = require("querystring");

var MIMEType = { 
	"css"	:"text/css",
	"txt": "text/plain",
	"css": "text/css",
	"js": "application/x-javascript",
	"html": "text/html",
	"json": "text/plain",
	"svg": "image/svg+xml"
}

var server = http.createServer(function(req,res){
	var url_obj = url.parse( req.url ,true)
	var pathName = url_obj.pathname
	var method = req.method.toLowerCase()
	
	//读取对应的页面内容，
	// fs.readFile('.' + pashName,function(err,data){
	fs.readFile('.' + pathName,function(err,data){
		if(err){
			res.setHeader("content-type", "text/plain;charset=utf-8");
			res.end('你输入的路径' + '.' +pathName + '不存在')
			return
		}
		var type = pathName.slice(pathName.indexOf('.') + 1)
 									//注意是两参数，逗号不能放在""中
		res.setHeader("content-type" , MIMEType[type] +  ";charset=utf-8");
		res.end(data)
	})
})

server.listen(3000);



