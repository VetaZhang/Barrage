
module.exports = function(server) {
		var io = require('socket.io');
		var io = io.listen(server);

		io.sockets.on('connection', function (client) {
			client.on('disconnect', function() {
				//
			});

			client.on('shake', function(data) {
				io.emit('shake', data);
			});
		});
};