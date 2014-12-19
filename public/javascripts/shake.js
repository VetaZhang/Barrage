document.addEventListener("deviceready", onDeviceReady, false);

var debug = document.getElementById('debug');
function onDeviceReady() {	debug.innerHTML = 'DeviceReady';
	var options = { frequency: 300 };	//* 监听周期
	var watchID = null;					//* watchID 将作为 watchAcceleration 方法的返回值
	var previousReading = { x: null, y: null, z: null}	//* 保存前一次读取到的加速度数据值
	var bound = 5;						//* 阈值
	
	//* 开启周期性监听加速度				
	function startWatch() {
		previousReading = {x: null, y: null, z: null};
		watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
		debug.innerHTML = 'start';
	}
		
	//* 成功获取加速度
	function onSuccess(reading) {
		var changes = {};	//* 记录当前加速度变化值
		if(previousReading.x !== null){		
			changes.x = Math.abs(previousReading.x - reading.x);
			changes.y = Math.abs(previousReading.y - reading.y);
			changes.z = Math.abs(previousReading.z - reading.z);		
		}
		debug.innerHTML = 'x:'+reading.x+' y:'+reading.y+' z:'+reading.z;
		
		//* 判断是否满足摇晃操作的条件			
		if(changes.x>bound || changes.y>bound || changes.z>bound){
			$('img[id^="img"]').css('display', 'none');
			var power = Math.pow(changes.x,2)+
									Math.pow(changes.y,2)+
									Math.pow(changes.z,2);
			power = Math.round(Math.sqrt(power));
			if(power<100) {
				$('#img_1').css('display', 'inline');
			}else if(power<200) {
				$('#img_2').css('display', 'inline');
			}else if(power<300) {
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

	startWatch();
}