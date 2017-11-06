var http = require('http');

var server = http.createServer(function(req,res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  //res.write();
  req.on('data',function(data){
   console.log("服务器接收到的数据：　"+decodeURIComponent(data));

  });

  req.on("end",function(){
   console.log('客户端请求数据全部接收完毕');

  });

res.end('{"name":"huangxiaojian","age":"23"}');

}).listen(1337,"localhost",function(){

 console.log("listened");

});
