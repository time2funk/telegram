
require('./bot');

var express = require('express');
var bodyParser = require('body-parser');
var packageInfo = require('./package.json');

var app = express();
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.json({
        version: packageInfo.version
    });
});
app.post('/' + process.env.TOKEN, function(req, res) {
	console.log('POST request '+req.body);
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

var server = app.listen(process.env.PORT, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Web server started at http://%s:%s', host, port);
});