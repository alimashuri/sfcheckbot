var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var fs = require('fs');
var headers = {
	    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36 OPR/36.0.2130.29 (Edition beta)'
};

var grabing = function(email,password,callback)
{
	request.post({
		url : 'https://my.smartfren.com/mysmartfren_login/login',
		headers : headers,
		jar : true,
		form : {
			userid : email,
			pass : password
		},
		json : true
	},function(err,response,json){
		if (json.status == '0')
		{
			request.get({
				url : 'https://my.smartfren.com/mysmartfren_home',
				jar : true,
				headers : headers
			},function(err,response,body){
				$ = cheerio.load(body);
				var $modal = $("#detail_package");
				var obj = {};
				var package = $modal.find("table")
								.children('tr')
								.eq(0)
									.children('td')
									.eq(2)
									.html().trim();
				var experyCard = $modal.find("table")
								.children('tr')
								.eq(1)
									.children('td')
									.eq(2)
									.html().trim();
				var volumePackage = $modal.find("table")
								.eq(1)
								.children('tr')
								.eq(0)
									.children('td')
									.eq(2)
									.html().trim();
				var experyPackage = $modal.find("table")
								.eq(1)
								.children('tr')
								.eq(1)
									.children('td')
									.eq(2)
									.html().trim();
				var bonusVolume = $modal.find("table")
								.eq(2)
								.children('tr')
								.eq(0)
									.children('td')
									.eq(2)
									.html().trim();
				var experyBonus = $modal.find("table")
								.eq(2)
								.children('tr')
								.eq(1)
									.children('td')
									.eq(2)
									.html().trim();

				var obj = {
					package : package,
					experyCard : experyCard,
					volumePackage : volumePackage,
					experyPackage : experyPackage,
					bonusVolume : bonusVolume,
					experyBonus : experyBonus
				}
				callback(false,obj);
			});
		}else
		{
			callback('username or password maybe wrong');
		}
	});
}

module.exports = {
	grabing : grabing
}