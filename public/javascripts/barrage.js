$(document).ready(function(){
  var number = 0;
  var win_width = $(window).width();
  var win_height = $(window).height();
  $('#screen').height(parseInt(win_height*0.35));
  $('#list').height(parseInt(win_height*0.65)-66);
  $('#color-board').css('top', win_height-87);
  var width = $('#screen').width();
  var height = $('#screen').height();

	socket = io.connect("/biu");

	socket.on('connect', function () {
    console.log('connect');
  });

  socket.on('disconnect', function () {
    console.log('disconnect');
  });

  socket.on('give', function(data) {
		$('#member').html('当前:'+data+'人');
	});

	setInterval('socket.emit("get")', 2000);

  socket.on('bar', function (data) {
    $("#list").prepend('<li class="item" style="">'+data.barrage+"</li>");

    var top = parseInt((height-15)*(data.top/100));
    var id = 'id_'+(++number);
    
    var bar = '<span id="'+id+
    	'" style="z-index:5;pointer-events:none;'+
      'position:fixed;white-space:nowrap;'+
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
        $("#biu").after('<p style="margin:10px;">弹幕过长,发送失败～(￣▽￣")</p>');
        return;
    }
    var top = parseInt(Math.random()*100);
    var color = $('#color-select').css('background-color');
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
      $('#color-board').css('display', 'none');
      show = false;
    }
    else {
      $('#color-board').css('display', 'inline');
      show = true;
    }
  });

  $('div[id^="color-item"]').click(function() {
    $('#color-board').css('display', 'none');
    show = false;
    $('#color-select').css('background-color',$(this).css('background-color'));
  });

});
