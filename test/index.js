const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

const url = 'https://launchlibrary.net/1.3/launch';
const token = '574129124:AAEh98_LgjD4VR4u4uvl-USZhLYaakPCoqY';

const bot = new TelegramBot(token, {polling: true});

const trigger = /\/echo (.+)/;
bot.onText(trigger, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; 

  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Received your message');
});