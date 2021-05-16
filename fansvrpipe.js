它同样也可以把接受到的任何信息返回给客户端。
const http = require('http');

http.createServer((request, response) => {
  let body = [];
  request.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    response.end(body);
  });
}).listen(8080);

现在让我们调整一下，我们只对以下条件应答：

请求方法是 POST 方式。
访问路径是 /echo。
其它任何情况均返回 404。

const http = require('http');

http.createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/echo') {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      response.end(body);
    });
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);

太棒了！现在我们进一步简化它。记住，request 是一个 ReadableStream对象，response对象是一个 WritableStream。
那意味着我们可以使用 pipe直接从一个流转到另外一个流。那的确是我们需要的：

const http = require('http');

http.createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/echo') {
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
响应输出，响应结束，监听

res.writeHead(200, {'Content-Type': 'text/plain'});
resp.write('</body>');
res.end('Hello World\n');

console.log(req.method)
const { headers, method, url } = request;
const userAgent = headers['user-agent'];

每次在 'data' 事件中触发抓获的数据块是一个 Buffer。如果你已知是一个字符串对象，那么
最好的方案就是把这些数据收集到一个数组中，然后在 'end' 事件中拼接并且把它转化为字符串。
let body = [];
request.on('data', (chunk) => {
  body.push(chunk);
}).on('end', () => {
  body = Buffer.concat(body).toString();
  // at this point, `body` has the entire request body stored in it as a string
});




const http = require('http');

http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // At this point, we have the headers, method, url and body, and can now
    // do whatever we need to in order to respond to this request.
  });
}).listen(8080); // Activates this server, listening on port 8080.



--------------------