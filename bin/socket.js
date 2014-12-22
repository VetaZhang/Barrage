
var func = require('./func.js');

module.exports = function(server) {
	var io = require('socket.io');
	var io = io.listen(server);
	var people = {
		biu: 0,
		shake: 0
	};

	io.of('/screen').on('connection', function (socket) {
		socket.on('disconnect', function() {
			//
		});
	});

	io.of('/biu').on('connection', function (socket) {
		people.biu++;
		socket.on('disconnect', function() {
			people.biu--;
			if(people.biu<=0)people.biu = 0;
		});

		socket.on('bar', function(data) {
			data.barrage = func.protect(data.barrage);
			io.of('/biu').emit('bar', data);
			io.of('/screen').emit('bar', data);
		});

		socket.on('get', function() {
			socket.emit('give', people.biu);
		});
	});

	io.of('/cj').on('connection', function (socket) {
		socket.on('disconnect', function() {
			//
		});

		socket.on('get', function() {
			socket.emit('give', people.shake);
		});
	});

	io.of('/shake').on('connection', function (socket) {
		people.shake++;
		socket.on('disconnect', function() {
			people.shake--;
			if(people.shake<=0)people.shake = 0;
		});
		
		socket.on('shake', function(data) {
			io.of('/cj').emit('shake', data);
		});
	});
};