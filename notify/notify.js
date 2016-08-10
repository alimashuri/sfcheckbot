var sms = require('./sms');
var conf = require('../conf.json');

var notif = function(datas,cb){
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
module.exports = {
	notif : notif
}