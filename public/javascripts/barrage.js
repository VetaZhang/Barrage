$(document).ready(function(){
  var number = 0;
  var win_width = $(window).width();
  var win_height = $(window).height();
  var topic = parseInt(win_height*0.15);
  $('#screen').height(parseInt(win_height*0.35));
  $('#list').height(parseInt(win_height*0.65)-106);
  $('img[id^="img"]').width(parseInt(win_width*0.6));
  $('img[id^="img"]').height(parseInt(win_height*0.4));
  var width = $('#screen').width();
  var height = $('#screen').height();

	socket = io.connect("/client");

	socket.on('connect', function () {
    $('#connect').html('已连接');
  });

  socket.on('disconnect', function () {
    $('#connect').html('连接断开');
  });

  socket.on('give', function(data) {
		$('#member').html('当前: '+data+'人');
	});

	setInterval('socket.emit("get")', 2000);

  socket.on('bar', function (data) {
    var id = 'id_'+(++number);
    var top = parseInt((height-15)*(data.top/100));
    $("#list").append('<li class="item">'+data.barrage+"</li>");
    
    var bar = '<span id="'+id+
    	'" style="z-index:5;pointer-events:none;'+
      'position:absolute;white-space:nowrap;'+
      'font-family:Arial,Helvetica,sans-serif;'+
      'left:'+width+'px;'+
      'top:'+top+'px;'+
      'color:'+data.color+';'+
      'font-size:14px;'+
      'font-weight:bold;'+
      '">'+data.barrage+'</span>';

    $('#screen').append(bar);
    bar = $('#'+id);
    var speed = parseInt(10000-bar.width()*30);
    if(speed<2000)speed = 2000;

    bar.animate({
      left:-bar.width()
    },
    speed,
    'linear',
    function() {
      $(this).remove();
    });
  });

	$('#biu').click(function() {
		var barrage = $('#barrage').val();

    if(barrage == '')return;
    if(barrage.length>256) {
        $("#list").append('<li class="item">弹幕过长,发送失败～(￣▽￣")~</li>');
        return;
    }
    var top = parseInt(Math.random()*100);
    var color = $('#biu').css('color');
		socket.emit('bar',{top:top,color:color,barrage:barrage});
		$('#barrage').val('');
	});

	$(document).keypress(function(e) {
	  if(e.which == 13) {
			$('#biu').click();
		}
	});

  var show = false;
  $('#color-select').click(function() {
    if(show) {
      $('#color-board').animate({
        bottom: '0',
        opacity: '0'
      },250,
      function() {
        show = false;
      });
    }
    else {
      $('#color-board').animate({
        bottom: '45px',
        opacity: '1'
      },250,
      function() {
        show = true;
      });
    }
  });

  $('div[id^="color-item"]').click(function() {
    $('#color-board').animate({
      bottom: '0',
      opacity: '0'
    },250,
    function() {
      show = false;
    });
    $('#biu').css('color',$(this).css('background-color'));
  });

  $('.toggleShake').click(function() {
    if($('#shake').css('display')=='none') {
      $('#shake').css('display', 'inline');
      $('#shake').animate({
        top: topic,
        opacity: '1'
      },250,
      function() {
        //
      });
    }
    else {
      $('#shake').animate({
        top: '0',
        opacity: '0'
      },250,
      function() {
        $('#shake').css('display', 'none');
      });
    }
  });

  //shake

  var current = { x: null, y: null, z: null };
  var bound = 5;
  var max = 0;
  var xyz = $('#xyz');
  var mp = $('#mp');

  function handler() {
    var power = current.x + current.y + current.z;
    if(power>max) max = power;
    mp.html('MaxPower: '+max);
    $('img[id^="img"]').css('display', 'none');
    socket.emit('shake', power);
    if(power<10) {
      $('#img_1').css('display', 'inline');
    }else if(power<20) {
      $('#img_2').css('display', 'inline');
    }else if(power<30) {
      $('#img_3').css('display', 'inline');
    }else {
      $('#img_4').css('display', 'inline');
    }
  }

  function deviceMotionHandler(eventData) {
    var acceleration = eventData.acceleration;
    current.x = Math.abs(Math.round(acceleration.x));
    current.y = Math.abs(Math.round(acceleration.y));
    current.z = Math.abs(Math.round(acceleration.z));
    xyz.html('x:' + current.x + ' y:' + current.y + ' z:' + current.z);

    if(current.x>bound || current.y>bound || current.z>bound) {
      handler();
    }
    else {
      $('img[id^="img"]').css('display', 'none');
      $('#img_1').css('display', 'inline');
    }
  }

  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion',deviceMotionHandler, false);
  }
  else {
    debug.innerHTML = '您的手机不支持加速度感应额～';
  }

});
