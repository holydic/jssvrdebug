const html = `
<html><form method=post enctype=multipart/form-data><input name=v><input type=file name=f><input type=submit name=upload></form></html>
<form><input name=v><input type=submit></form>
`
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
        // BEGINNING OF NEW STUFF

        response.on('error', (err) => {
            console.error(err);
        });
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        //response.setHeader('Content-Type', 'application/json');
        // Note: the 2 lines above could be replaced with this next one:
        // response.writeHead(200, {'Content-Type': 'application/json'})

        const responseBody = { headers, method, url, body, html };

        // response.write(JSON.stringify(responseBody));
        // response.end(responseBody);
        // Note: the 2 lines above could be replaced with this next one:
        response.end(JSON.stringify(responseBody))

        // END OF NEW STUFF
    });
}).listen(80);


//这一句写入纯文本即使是html代码 res.writeHead(200, {'Content-Type': 'text/plain'});