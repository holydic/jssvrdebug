const html=`
<html><form method=post enctype=multipart/form-data><input name=v><input type=file name=f><input type=submit name=upload></form></html>
<form><input name=v><input type=submit></form>
`
var http = require('http');

var hostname = '0.0.0.0';
var port = 80;

var server = http.createServer();

server.on("request",function(req,res){
    console.log(req.method);    //输出请求方式：GET or Put
    console.log(req.url);      //输出地址
    console.log(req.headers);  //输出文件头

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

server.listen(port, hostname, function(){
  console.log('Server running at http://'+hostname+':'+port+'/');
});