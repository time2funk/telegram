const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

const TOKEN = '574129124:AAEh98_LgjD4VR4u4uvl-USZhLYaakPCoqY';
const herokuName = 'sad-telegram-bot'
const url = process.env.APP_URL || `https://${herokuName}.herokuapp.com:443`;
const options = {
  webHook: {
    port: process.env.PORT
  }
};
const bot = new TelegramBot(TOKEN, options);
console.log('bot server started...');

bot.on('message', function onMessage(msg) {
	bot.sendMessage(msg.chat.id, 'I am alive on Heroku!');
});

// This informs the Telegram servers of the new webhook.
// Note: we do not need to pass in the cert, as it already provided
bot.setWebHook(`${url}/bot${TOKEN}`);

