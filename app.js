var express = require('express');
var app = module.exports = express.createServer();
var mongoose = require('mongoose');


var db_uri = process.env.MONGOLAB_URI || process.env.MONGODB_URI || config.default_db_uri;
mongoose.connect(db_uri);

var config = require('./config.js')(app, express);

var models = {};
models.examples = require('./models/example')(mongoose);

require('./routes')(app, models, mongoose);

app.listen(process.env.PORT || 3000);