{/* <html><form><input name=v><input type=submit></form></html>

<!DOCTYPE html>
<html lang=zh-cn>
<head><meta charset="UTF-8" /></head>
<form action="/aaa" method="get">
    账号<input type="text" name='username'> <br>
    密码<input type="password" name='password'>
    <input type="submit" value = "提交">
</form>
</html> */}
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

let server = http.createServer((req,res)=>{
// console.log(url);
let {pathname,query} = url.parse(req.url,true);
//console.log(path.join(__dirname,'data','data.json'));
//fs.writeFile(path.join(__dirname,'data','data.json'),JSON.stringify(query));
//fs.writeFile('user.json', JSON.stringify(query),(err)=>{console.log('ok')});
console.log(query)
    fs.writeFile(path.join(__dirname,'data','data.json'),JSON.stringify(query),function(err){
        if(err){
            throw err;
        }
        console.log('ok');
    });

fs.appendFile("./user.json",JSON.stringify(query) + "\r\n", (error)  => {
  if (error) return console.log("追加文件失败" + error.message);
  console.log("追加成功");
});

if(pathname === '/'){
fs.readFile('./2.html',(err,data)=>{
if(err){
res.writeHeader(404);
res.end(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>404</title>
</head>
<body>
<h1>
您要找的页面找不到了</h1>
</body>
</html>`);
}else{
res.end(data);
}
})
}else if(pathname ==='/aaa'){
res.end(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>数据</title>
</head>
<body>
<h1>你提交的账号为:${query.username}</h1>
<h1>你提交的密码为:${query.password}</h1>
</body>
</html>`)
}
});

server.listen(80,()=>{
    console.log('服务器启动成功');
});
