var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var last;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/assets',  express.static('assets'));

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
    		console.log('user disconnected');
  	});
	socket.on('update', function(data){
        console.log('data: ' + data);
        last = data;
		io.emit('update', data);
	});
	
	socket.on('pause', function () {
		console.log('pause');
		io.emit('pause');
	});
	
	socket.on('reset', function () {
		console.log('reset');
		io.emit('reset');
	});
});

http.listen(port, function(){
	console.log('listening on *:' + port);
  /*console.log('listening on *:3000');*/
});