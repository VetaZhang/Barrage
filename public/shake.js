
function start(callback) {
	socket = io.connect("http://www.duanpengfei.com:3000/");

	var sum = 0;
	var people = 1;

	socket.on('connect', function(data) {
		socket.emit('get', '');
		console.log('connect');
	});

	socket.on('give', function(data) {
		people = data;
		console.log(people);
	});

	setInterval('socket.emit("get", "")', 1000);

	socket.on('shake', function(data) {
		if(people < 2) return;
		sum += data;
		if(sum >= (people-1)*200) {
			sum = 0;
			callback(people-1);
		}
	});
}
