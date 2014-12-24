
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

	io.of('/cj').on('connection', function (socket) {
		socket.on('disconnect', function() {
			//
		});

		socket.on('get', function() {
			socket.emit('give', people.shake);
		});
	});

	/*io.of('client').on('connection', function (socket) {
		socket.rooms[0] = {};
		socket.on('join', function(data) {
			if(data=='biu'||data=='shake') {
				if(!socket.rooms[0][data]) {
					socket.join(data);
					socket.rooms[0][data] = data;
					people[data]++;console.log(people);
				}
			}
		});

		socket.on('leave', function(data) {
			if(data=='biu'||data=='shake') {
				if(socket.rooms[0][data]) {
					socket.leave(data);
					socket.rooms = [];
					people[data]--;console.log(people);
				}
			}
		});

		socket.on('disconnect', function() {
			switch (socket.rooms[0]) {
				case 'biu': {
					people.biu--;console.log(people);
					if(people.biu < 0) people.biu = 0;
				}break;
				case 'shake': {
					people.shake--;console.log(people);
					if(people.shake < 0) people.shake = 0;
				}break;
			}
		});

		socket.on('bar', function(data) {
			data.barrage = func.protect(data.barrage);
			io.of('/client').in('biu').emit('bar', data);
			io.of('/screen').emit('bar', data);
		});

		socket.on('get', function() {
			socket.emit('give', people.biu);
		});

		socket.on('shake', function(data) {
			io.of('/cj').emit('shake', data);
		});

	});*/

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