
var h1 = document.getElementById('h_1');
var h2 = document.getElementById('h_2');
var h3 = document.getElementById('h_3');

function deviceMotionHandler(eventData) {
	var acceleration =eventData.acceleration;
	h1.innerHTML = acceleration.x;
	h2.innerHTML = acceleration.y;
	h3.innerHTML = acceleration.z;
}

if (window.DeviceMotionEvent) {
	window.addEventListener('devicemotion',deviceMotionHandler, false);
}