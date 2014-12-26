
function start(callback) {
	socket = io.connect("http://www.flappyant.com:3030/cj");

	var sum = 0;
	var people = 1;

	function date() {
		var d = new Date();
		return parseInt(d.getTime());
	}

	var t1 = date();
	var t2 = 0;

	socket.on('connect', function() {
		socket.emit('get');
		console.log('connect');
	});

	socket.on('give', function(data) {
		people = data;
	});

	setInterval('socket.emit("get")', 1000);

	socket.on('shake', function(data) {
		if(people < 1) return;
		sum += data;
		if(sum >= (people)*350) {
			sum = 0;
			t2 = date();
			var speed = t2-t1;
			t1 = t2;
			if(speed>1800) speed = 1800;
			else if(speed<400) speed = 400;
			callback(speed, people);
		}
	});
}
