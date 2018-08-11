const TeleBot = require('.');
const bot = new TeleBot('');

// On every text message
bot.on('text', msg => {

// discard old message, usefull when the bot start and catch old messages
    if (Math.floor(Date.now() / 1000) > msg.date + 120) {
	console.log("discarded message (too old) "+msg.text);
	return;
    }

    console.log(msg);

    var re = new RegExp("^.url (.*)","i");
    var result = msg.text.match(re);
    if (result) {
        var capture = require('screenshotlayer')('');
	capture(result[1], '/tmp/webpage', { width: 2048 }).then(function () {
		return msg.reply.photo('/tmp/webpage');
	});
    }


    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('ibot.db.small')
    });

    lineReader.on('line', function (line,reply) {

       var item = line.split(' ');
       var re = new RegExp(item[0],"i");

       if (msg.text.match(re)) { 
          reply = item.slice(1).join(' ');
          reply = reply.replace(/N~/g, msg.from.username || msg.from.first_name);
          reply = reply.replace(/\|/g, "\n");
          return bot.sendMessage(msg.chat.id, `${ reply }`);
       };

    });

});

bot.connect();


