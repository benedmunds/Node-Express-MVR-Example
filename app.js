var express = require('express');
var app = module.exports = express.createServer();
app.everyauth = require('everyauth');
app.everyauth.helpExpress(app);
app.mongoose = require('mongoose');

var config = require('./config.js')(app, express);

var models = {};
models.examples = require('./models/example')(app.mongoose);

require('./routes')(app, models);

app.listen(process.env.PORT || 3000);