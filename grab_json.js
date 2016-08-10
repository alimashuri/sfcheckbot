var request = require('request');

var grabing = function(number,callback){
	var params = {
		id : 1,
		my_params : [],
		method : "Handshake",
		params : ["IJC"+number,
				"generic",
				"unknown",
				"sdk",
				"Android 4.4.2",
				"MySmartfren",
				"5.1.7",
				0,
				1080,
				"Indonesia",
				1,
				"sdk-eng 4.4.2 KK 986172 test-keys"],
		challenge : "JnJIdSfqj295tSi3qHGN2A\n",
		jsonrpc : "2.0",
		imei : "000000000000000"
	}
	console.log(number);
	console.log(JSON.stringify(params).length);
	var headers = {
	    'Content-Length' : JSON.stringify(params).length
	};
	request({
		url : 'https://custinfo.smartfren.com/api/index.php/hotapi',
		method : 'POST',
		headers : headers,
		json : params
	},function(err,response,json){
		var session = json.result.data.session_id;
		var params = {
			id : 1,
			method : 'getSubInfoDetail',
			params : [session,
				'generic',
				'unknown',
				'sdk',
				'Android 4.4.2',
				'MySmartfren',
				'5.1.7'
			],
			lang : "Indonesia",
			jsonrpc : "2.0"
		}
		var headers = {
		    'Content-Length' : JSON.stringify(params).length
		};

		request({
			url : 'https://custinfo.smartfren.com/api/index.php/hotapi',
			method : 'POST',
			headers : headers,
			json : params
		},function(err,response,json){
			var obj = {
				package : json.result.data.resultPackages[0].packName,
				experyCard : json.result.data.resultPackages[0].packExpDate,
				volumePackage : json.result.data.resultPackages[0].packAmount,
			}
			callback(false,obj);
		});

	})	
}

module.exports = {
	grabing : grabing
}