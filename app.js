var grab = require('./grab');
var notify = require('./notify/notify');
var grab_json = require('./grab_json');
// grab via api
var number = process.argv[2];
if (number && number.length < 2)
{
	console.log('number is empty, stop processing');
}else
{
	grab_json.grabing(number,function(err,data){
		if(err) {
			console.log(err);
			process.exit();
		}else{
			notify.notif(data,function(err){
				if (err) console.log(err);
			});
		}
	});
	//grab via website
	/*
	grab.grabing('xxxxx','yyyy',function(err,result){
		if (! err)
		{
			notify.notif(result,function(err){
				if (err) console.log(err);
			});
		}else
		{
			console.log(err);
		}
	});
	*/
}

