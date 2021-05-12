http = require('http');
fs = require('fs');
url = require('url');
querystring = require('querystring');

var server = http.createServer(requestServer);
server.listen(8080);

function requestServer(req, res){
	var uri = url.parse(req.url, true);		// 第2引数trueでqueryストリングを解析する(getの時使う)
	
	if(uri.pathname == "/post") {
		if(req.method.toLowerCase() === "post") {	// postメソッドなら
			console.log("post");
			var postString = "";
			// 非同期でデータを読み込むようにする。
			req.on("data", data => {
				postString += data;
			});
			// 読み込み終わった場合の処理をする。
			req.on("end", ()=> {
				var postData = querystring.parse(postString);
				res.writeHead(200, { "Content-Type": "text/plain" });
				res.write("userid:" + postData["userid"] + "\n");
				res.write("password:" + postData["password"]);
				res.end();
			});
		} if(req.method.toLowerCase() === "get") {	// getメソッドなら
			// url.parseの第2引数でqueryストリングを解析しているので
			// uri.queryでフォーム入力した値を取得できる。
			console.log("get");
			res.writeHead(200, { "Content-Type":"text/plain"});
			res.write("userid:" + uri.query["userid"] + "\n");
			res.write("password:" + uri.query["password"]);
			res.end();
		} else {
			res.writeHead(404, { "Content-Type": "text/plain" });
			res.write("404 Not Found.");
			res.end();
		}
	} else {
		// ログインフォームのHTMLを返す。
		console.log("etc");
		res.writeHead(200, { "Content-Type": "text/html" });
		fs.createReadStream("./PostForm.html")
			.pipe(res);
	}
}