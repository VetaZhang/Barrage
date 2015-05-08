var express = require('express');
var fs = require('fs');
var router = express.Router();

var data = fs.readFileSync('id.txt');
data = data.toString();
if(data=='') list = [];
else list = data.split(',');
console.log(list.length);

router.get('/screen', function(req, res) {
  res.render('screen');
});

router.get('/barrage', function(req, res) {
  res.render('barrage');
});

router.get('/input', function(req, res) {
  res.render('input');
});

router.post('/addId', function(req, res) {
	var id = req.body.id;
	if(id && !isNaN(id) && id.length==8) {
		for(var i=0, len=list.length;i<len;i++) {
	  	if(list[i]==id) {
	  		res.json({status:null,msg:'添加失败，学号已存在'});
	  		var flag = 1;
	  		break;
	  	}
	  }
	  if(flag) return;
	  list.push(id);console.log(list.length);
	  fs.writeFile('id.txt',list.join(','),function(err){
    	if(err) res.json({status:null,msg:'添加失败，服务器写入出错'});
    	else res.json({status:'1'});
		});
	}else res.json({status:null,msg:'学号格式怪怪的 + _ +'});
});

router.get('/lottery', function(req, res) {
  res.render('lottery');
});

router.get('/getId', function(req, res) {
  res.json({list: list});
});

module.exports = router;
