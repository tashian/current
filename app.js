require('dotenv').config();

var _ = require('underscore');
app = require('express')(),
swig = require('swig'),
lessMiddleware = require('less-middleware');

var Instagram = require('./instagram');
(new Instagram()).fetch();

// This is where all the magic happens!
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
