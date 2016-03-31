var restify = require('restify');
var builder = require('botbuilder');
var google = require('google');

google.resultsPerPage = 1;
var nextcounter = 0;


var bot = new builder.BotConnectorBot({appId: 'YourAppId', appSecret: 'YourAppSecret'});
bot.add('/', function(session) {
	google(session.message.text, function( err, res) {
		if( err ) console.error(err);
		session.send(res.links[0].title + ' - ' + res.links[0].href);
	});
	/*
	var re = /sold/i
	var isSold = re.exec(session.message.text);
	if(isSold != null) {
		session.send('the item has been sold to you. Best of luck!');
	} else {
		session.send('Would you like to buy an item?');
	}
	*/
});

var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || 8080, function () {
	console.log('Started');
});
