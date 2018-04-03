
const TelegramBot = require('node-telegram-bot-api');
const herokuName = 'sad-telegram-bot'

if (process.env.NODE_ENV === 'production') {
    bot = new Bot(SadToken);
    bot.setWebHook(`https://${herokuName}.herokuapp.com:${SadPort}` + bot.token);
} else {
    bot = new Bot(token, {
        polling: true
    });
}
console.log('bot server started...');

bot.onText(/^\/say_hello (.+)$/, function(msg, match) {
    var name = match[1];
    bot.sendMessage(msg.chat.id, 'Hello ' + name + '!').then(function() {
        // reply sent!
        console.log('reply sent!');
    });
});

bot.onText(/^\/sum((\s+\d+)+)$/, function(msg, match) {
    var result = 0;
    match[1].trim().split(/\s+/).forEach(function(i) {
        result += (+i || 0);
    })
    bot.sendMessage(msg.chat.id, result).then(function() {
        // reply sent!
        console.log('reply sent!');
    });
});