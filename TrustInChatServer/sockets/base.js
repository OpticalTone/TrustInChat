module.exports = function (io) {
	'use strict';
	//io.on('connection', function(socket) {
		//console.log('connected');
		//socket.on('message', function(from, msg) {
		//	console.log('recived message from', from, 'msg', JSON.stringify(msg));
		//	console.log('brodcasting message');
		//	console.log('payload is', msg);
		//	io.sockets.emit('broadcast', {
		//		payload: msg,
		//		source: from
		//	});
		//	console.log('broadcast complete');
		//});
	//});
	//io.sockets.on('connection', function(socket){
	//  socket.emit('message', {'message': 'hello!'});
	//});

	io.on('connection', function(socket){
	  console.log('a user connected');
	  socket.emit('message', {'message': 'hello!'});
	  socket.on('disconnect', function(){
	    console.log('user disconnected');
	  });
	});
}