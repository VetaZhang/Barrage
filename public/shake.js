
function start(callback) {
	socket = io.connect("http://www.duanpengfei.com:3000/");

	var sum = 0;
	var people = 1;
	var s = new Date();
	var t1 = s.getTime();
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
		if(people < 2) return;
		sum += data;
		if(sum >= (people-1)*300) {
			sum = 0;
			t2 = s.getTime();console.log(t1+'and'+t2+'and'+t2-t1);
			var speed = t2-t1;
			if(speed>2000) speed = 2000;
			else if(speed<500) speed = 500;
			t1 = t2;
			callback(speed, people-1);
		}
	});
}
