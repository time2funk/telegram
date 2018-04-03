const SadToken = process.env.TOKEN;
const SadPort = process.env.PORT || 443
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
app.post('/' + SadToken, function(req, res) {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

var server = app.listen(SadPort, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Web server started at http://%s:%s', host, port);
});