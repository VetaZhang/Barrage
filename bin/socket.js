
module.exports = function(server) {
		var io = require('socket.io');
		var io = io.listen(server);
		var people = 0;

		io.sockets.on('connection', function (client) {
			people++;
			client.on('disconnect', function() {
				people--;
				if(people<=0)people = 0;
			});

			client.on('get', function(data) {
				client.emit('give', people);
			});
			
			client.on('shake', function(data) {
				io.emit('shake', data);
			});
		});
};