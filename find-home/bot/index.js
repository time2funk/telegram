const db = require('../db');

const TelegramBot = require('node-telegram-bot-api'),
    bot = new TelegramBot(process.env.TOKEN, {
        polling: true
    });
console.log('bot server started...');

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message');

    // sign for homesearch
    console.log(' - - -msg- - - - - - - - - - - - - - ');
    console.log(msg);
    if (msg.text == 'findmeahome') {
        bot.sendMessage(chatId, 'we will find it');
        db.getCollection('users', (collection, err) => {
            if (err) {
                console.log("err " + err);
            }
            collection.findOne({
                    "telID": chatId
                })
                .then((user) => {
                    console.log("user");
                    console.log(user);
                    if (!user) {
                        console.log(" New User ");
                        db.getCollection('users', (collection) => {
                            collection.insert({
                                telID: msg.chat.id,
                                first_name: msg.chat.first_name,
                                last_name: msg.chat.last_name,
                                username: msg.chat.username,
                            }, function(err, result) {
                                if (err) console.log(err);
                                console.log(result);
                            })
                        });
                    } else {
                        console.log("user already exist");
                    }
                });
        });
    }
});

bot.onText(/^\/say (.+)$/, function(msg, match) {
    var words = match[1];
    bot.sendMessage(msg.chat.id, 'Bot: ' + words + '!').then(function() {
        // reply sent!
        console.log('reply sent!');
    });
});


bot.onText(/ping/, function(msg, match) {

    setInterval(function() {
        bot.sendMessage(msg.chat.id, 'hi!');
    }, 1000);

});

bot.on('polling_error', (error) => {
    console.log(error);
    // console.log(error.code);  // => 'EFATAL'
});

module.exports = bot;