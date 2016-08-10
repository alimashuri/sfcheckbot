var sms = require('./sms');
var conf = require('../conf.json');
var fs = require('fs');
var cache = {
	notif : true,
	lastcheck : 0
}
var notif = function(datas,cb){
	read_config(function(err,data){
		console.log(data);
	});
	if (datas.volumePackage < conf.alert_quota)
	{
		doNotif(datas,function(){
			cb(false,'nofif send');
		});
	}else
	{
		cb(false,'quota aman');
	}
}

var doNotif = function(datas,cb){
	if (conf.sms){
		console.log(datas);
		var text = 'hai quotamu '+datas.package+' tinggal ' + datas.volumePackage + " KB berakhir pada " + datas.experyCard;
		sms.doSms(text,function(){
			cb(false);
		});
	}
}

var read_config = function(cb)
{
	fs.readFile('./cache.bat', 'utf8', function (err,data) {
	  if (err) {
	    write_config(function(err,data){
	    	cb(err,data);
	    });
	  }else cb (false,data);
	});
}

var write_config = function(cb)
{
	fs.writeFile('./cache.bat',JSON.stringify(cache),function(err){
		cb(err,cache);
	});
}
module.exports = {
	notif : notif
}