
function start(max, callback) {
	socket = io.connect("http://www.duanpengfei.com:3000/");

	var sum = 0;
	
	socket.on('shake', function(data) {
		sum += data;
		if(sum>=max) {
			sum -= max;
			callback();
		}
	});
}
