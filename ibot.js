const TeleBot = require('.');
const bot = new TeleBot('');

// On every text message
bot.on('text', msg => {
    let id = msg.chat.id;
//    let reply = '';

    console.log(msg);

    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('ibot.db.small')
    });

    lineReader.on('line', function (line,reply) {

       var item = line.split(' ');
       var re = new RegExp(item[0],"i");

       if (msg.text.match(re)) { 
          reply = item.slice(1).join(' ');
          reply = reply.replace(/N~/g, msg.from.username);
          reply = reply.replace(/\|/g, "\n");
          return bot.sendMessage(id, `${ reply }`);
       };

    });

});

bot.connect();


