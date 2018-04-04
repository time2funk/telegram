const TelegramBot = require('node-telegram-bot-api');
const herokuName = 'sad-telegram-bot';

if (process.env.NODE_ENV === 'production') {
    console.log(' <-> production NODE_ENV');
    console.log(' <-> TOKEN ' + process.env.TOKEN);
    console.log(' <-> PORT ' + process.env.PORT);
    bot = new TelegramBot(process.env.TOKEN);
    bot.setWebHook(`https://${herokuName}.herokuapp.com:443/${process.env.TOKEN}`);
} else {
    bot = new Bot(token, {
        polling: true
    });
}
console.log(' <-> bot server started...');

bot.onText(/^\/say_hello (.+)$/, function(msg, match) {
    var name = match[1];
    bot.sendMessage(msg.chat.id, 'Hello ' + name + '!');
});

bot.onText(/^\/sum((\s+\d+)+)$/, function(msg, match) {
    var result = 0;
    match[1].trim().split(/\s+/).forEach(function(i) {
        result += (+i || 0);
    })
    bot.sendMessage(msg.chat.id, result);
});
