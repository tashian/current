require('dotenv').config();

var _          = require('underscore');
express        = require('express'),
swig           = require('swig'),
lessMiddleware = require('less-middleware'),
path           = require('path'),
favicon        = require('serve-favicon'),
logger         = require('morgan'),
routes         = require('./routes/index');

app = express();

var Instagram = require('./instagram');
(new Instagram()).fetch();

// This is where all the magic happens!
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(lessMiddleware(
    __dirname + '/public',
    { dest: __dirname + '/public/css' }
  )
);
app.use(express.static(__dirname + '/public'));
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
