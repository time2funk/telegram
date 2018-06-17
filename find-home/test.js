
// const url = 'https://www.gumtree.pl/s-mieszkania-i-domy-do-wynajecia/warszawa/mieszkanie/v1c9008l3200008a1dwp1?fr=ownr&pr=1300,2300&nr=3';
const url = 'https://www.olx.pl/nieruchomosci/mieszkania/wynajem/warszawa/?search%5Bfilter_float_price%3Afrom%5D=1000&search%5Bfilter_float_price%3Ato%5D=2200&search%5Bfilter_enum_rooms%5D%5B0%5D=three&search%5Bprivate_business%5D=private';

// xvfb-run node --harmony index.js
// pm2 start --interpreter xvfb-run npm -- start

// sudo apt-get install xvfb 
// const Xvfb = require('xvfb');
// xvfb = new Xvfb();
// xvfb.startSync();
// xvfb.stopSync();
// xvfb.stop(function(err) {});
const db = require('./db');
const scraper = require('./scraper');
const bot = require('./bot');

function notifyAll (item){
    db.getCollection('users', (collection) => {
        collection.find().toArray((err, users) => {
            console.log("users");
            console.log(users);

            for (var j = 0; j < users.length; j++) {
            	bot.sendPhoto(users[j].telID, item.pic);
                bot.sendMessage(users[j].telID, `
				${ item.link }
				${ item.name }
				${ item.location }
				${ item.price }
				${ item.trade ? "price agreeable" : "" }
				id: ${ item.id }
				${ item.date }
				`);
            }
        });
    });
}

const express = require('express');
const packageInfo = require('./package.json');
var app = express();
app.get('/', function(req, res) {
    res.json({
        version: packageInfo.version
    });
});
var server = app.listen(process.env.PORT, async function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Web server started at http://%s:%s', host, port);

	// setInterval(async function(){
		try {	
			console.log('lets scrapp data');
			var list = await scraper.getLink(url);
			console.log("list");
			console.log(list);
			console.log(" - end -");
		} catch (e) {
			console.log(e);
			return 0;
		}
	// }, 1000*60*5); // every 15 min

});
