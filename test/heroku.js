const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

const TOKEN = '574129124:AAEh98_LgjD4VR4u4uvl-USZhLYaakPCoqY';
const herokuName = 'sad-telegram-bot'
const url = process.env.APP_URL || `https://${herokuName}.herokuapp.com:443`;
const options = {
  webHook: {
    // Port to which you should bind is assigned to $PORT variable
    // See: https://devcenter.heroku.com/articles/dynos#local-environment-variables
    port: process.env.PORT
    // you do NOT need to set up certificates since Heroku provides
    // the SSL certs already (https://<app-name>.herokuapp.com)
    // Also no need to pass IP because on Heroku you need to bind to 0.0.0.0
  }
};
const bot = new TelegramBot(TOKEN, options);


// This informs the Telegram servers of the new webhook.
// Note: we do not need to pass in the cert, as it already provided
bot.setWebHook(`${url}/bot${TOKEN}`);


bot.on('message', function onMessage(msg) {
  bot.sendMessage(msg.chat.id, 'I am alive on Heroku!');
});