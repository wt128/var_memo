import http from 'http';
let server = http.createServer();

server.on('request',(req: httpRequest, res: HttpResponse) =>{
    res.writeHead(200, {'Content-text' : 'text/plain'})


})
