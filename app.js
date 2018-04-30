var express = require('express');
var bodyParser = require('body-parser');

var expressHsb = require('express-handlebars');
var mongoose = require('mongoose');
var path = require('path');


var routes = require('./routes/index');

var app = express();
mongoose.connect('mongodb://localhost:27017/noticiasApp');
//mongoose.connect('mongodb://fran:frano4240@ds247678.mlab.com:47678/noticiasapp')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text({ defaultCharset: "utf-8",
									type: "text/plain"}))



app.engine('.hbs',expressHsb({
	defaultLayout: 'layout',
	extname: '.hbs',
	partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);

module.exports = app;
