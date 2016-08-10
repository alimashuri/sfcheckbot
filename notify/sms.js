var request = require('request');
var conf = require('../conf.json');
module.exports = {
	doSms : function(string,cb){
		request.post({
		url : 'http://apisms.nuwira.net/oauth/access_token',
		form : {
			grant_type : 'client_credentials',
			scope : 'send,statistic,status',
			client_id : 'nBo3R8w4gQWrxjhx3zkwbto6WxYgdNV0qXJx29Kb',
			client_secret : 'q3VzA26pYWQdGmvWMBqhahGMxE2vro0vDbmGkLxO'
		},
		json : true
	},function(err,Response,obj){
		request.post({
			url : 'http://apisms.nuwira.net/api/v2/messages/send',
			headers: {
			    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41'
			  },
			form : {
				phone : conf.phone,
				message : string,
				access_token : obj.access_token
			},
			json : true
		},function(err,response,obj){
			cb(false);
		});
	});
	}
}