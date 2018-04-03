const Telegraf = require('telegraf');
const axios = require('axios'); 
const TOKEN = '574129124:AAEh98_LgjD4VR4u4uvl-USZhLYaakPCoqY';
const app = new Telegraf(TOKEN);

app.hears('hi', ctx => {
	return ctx.reply('Hey!');
});


app.on('text', ctx => {
	// ctx object holds the Update object from Telegram API
	// So you can use everything you see there

	// get the text message sent by user
	const subreddit = ctx.message.text;

	axios.get(`https://reddit.com/r/${subreddit}/top.json?limit=10`)
		.then(res => {
			const data = res.data.data;

			if (data.children.length < 1)
				return ctx.reply("The subreddit couldn't be found.");

			const link = `https://reddit.com/${data.children[0].data.permalink}`;
			return ctx.reply(link);
		})
		.catch(err => console.log(err));
});


app.startPolling();

