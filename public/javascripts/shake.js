
socket = io.connect("/");
socket.emit('shake', previous);
var previous = { x: null, y: null, z: null };
var current = { x: null, y: null, z: null };
var bound = 2;
var debug = document.getElementById('debug');

function deviceMotionHandler(eventData) {
	var acceleration = eventData.acceleration;
	current.x = Math.round(acceleration.x);
	current.y = Math.round(acceleration.y);
	current.z = Math.round(acceleration.z);
	debug.innerHTML = 'x:' + current.x + ' y:' + current.y + ' z:' + current.z;
}

function handler() {
	var changes = {};	//* 记录当前加速度变化值
	if(previous.x != null){
		changes.x = Math.abs(previous.x - current.x);
		changes.y = Math.abs(previous.y - current.y);
		changes.z = Math.abs(previous.z - current.z);
	}
	else {
		previous = current;
		return;
	}
	socket.emit('shake', previous);
	document.getElementById('debug0').innerHTML = 
		'x:' + changes.x + ' y:' + changes.y + ' z:' + changes.z;

	if(changes.x>bound || changes.y>bound || changes.z>bound){
		$('div[id^="img"]').css('display', 'none');
		var power = changes.x + changes.y + changes.z;
		document.getElementById('debug0').innerHTML = power;
		if(power<4) {
			$('#img_1').css('display', 'inline');
		}else if(power<6) {
			$('#img_2').css('display', 'inline');
		}else if(power<8) {
			$('#img_3').css('display', 'inline');
		}else {
			$('#img_4').css('display', 'inline');
		}
	}
	previous = current;
}

if (window.DeviceMotionEvent) {
	window.addEventListener('devicemotion',deviceMotionHandler, false);
	var loop = setInterval("handler()", 300);
}
else {
	debug.innerHTML = '您的手机不支持加速度感应额～';
}



/*document.addEventListener("deviceready", onDeviceReady);

function onDeviceReady() {
	var debug = document.getElementById('debug');
	var options = { frequency: 300 };	//* 监听周期
	var watchID = null;					//* watchID 将作为 watchAcceleration 方法的返回值
	var previousReading = { x: null, y: null, z: null}	//* 保存前一次读取到的加速度数据值
	var bound = 5;						//* 阈值

	debug.innerHTML = 'DeviceReady';

	//* 成功获取加速度
	function onSuccess(reading) {
		var changes = {};	//* 记录当前加速度变化值
		if(previousReading.x != null){		
			changes.x = Math.abs(previousReading.x - reading.x);
			changes.y = Math.abs(previousReading.y - reading.y);
			changes.z = Math.abs(previousReading.z - reading.z);		
		}
		else {
			previousReading = { x: reading.x, y: reading.y, z: reading.z};
		}
		debug.innerHTML = 'x:'+reading.x+' y:'+reading.y+' z:'+reading.z;
		
		//* 判断是否满足摇晃操作的条件			
		if(changes.x>bound || changes.y>bound || changes.z>bound){
			$('div[id^="img"]').css('display', 'none');
			var power = Math.pow(changes.x,2)+
									Math.pow(changes.y,2)+
									Math.pow(changes.z,2);
			power = Math.round(Math.sqrt(power));
			if(power<10) {
				$('#img_1').css('display', 'inline');
			}else if(power<15) {
				$('#img_2').css('display', 'inline');
			}else if(power<20) {
				$('#img_3').css('display', 'inline');
			}else {
				$('#img_4').css('display', 'inline');
			}
		}
		//* 将当前加速度值保存到上一次加速度值对象
		previousReading = { x: reading.x, y: reading.y, z: reading.z};
	}
	
	//* 获取加速度失败 
	function onError() {
		debug.innerHTML = 'error';
	}

	navigator.accelerometer.getCurrentAcceleration(function(reading){
			document.getElementById('debug_0').innerHTML = 'current get';
		}, function() {
			document.getElementById('debug_0').innerHTML = 'current false';
		}
	);

	//* 开启周期性监听加速度
	watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
	debug.innerHTML = 'start';
	debug.innerHTML = typeof(navigator.accelerometer.watchAcceleration(onSuccess, onError, options));
}*/