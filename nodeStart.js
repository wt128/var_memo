let http = require('http');

let request = require('request');
 

let fs = require('fs');
//let exjs = require('searching.js');
//server.on('request', doRequest);

const indexHtml = fs.readFileSync('./testApi.html')
const js =fs.readFileSync('./js/search.js')


const server= http.createServer((req, res) => {
        console.log(req.url);
        console.log(req.method);
        if(req.method==='GET'){
            if(req.url==='/'){
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(indexHtml);
                console.log('a');
                res.end();
            }
            else if(req.url==='/js/search.js'){
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write(js);
                console.log('b');
                res.end();
            }
    }

        else if(req.url==='/recieve'){
            
            var data = '';
            res.writeHead(200,{
                'Access-Contorl-Allow-Origin':'localhost:8000'
            })
            //POSTデータを受けとる
            req.on('data', function(chunk) {data += chunk})
                .on('end', function() {
                    //res.writeHead(200,{'Access-Contorl-Allow-Origin':localhost:8000})
                    console.log(data);
                    res.write(data);
                    res.end();
                })
            }
      });
      
      const port = 8000;
      server.listen(port, () => {
        console.info(`Listening on ${port}`);
      });


let address = '9660011'; // ここをhtml側から取得したい。
let data = [];
let url = 'https://zipcloud.ibsnet.co.jp/api/search';


request.get({
    uri: url,
    headers: {'Content-type': 'application/json'},
    qs: {
        zipcode:"9670002"
        // GETのURLの後に付く
        // ?hoge=hugaの部分
    },
    json: true
}, function(err, req, data){
    console.log(data);
});
