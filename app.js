var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var path = require('path');
var settings = require('./settings');

//var routes = require('./routes/index');
var users = require('./routes/users');
//var wares = require('./routes/wares');
//var carts = require('./routes/carts');

var app = express();
app.use(express.static('app'));
app.use(favicon(path.join(__dirname, 'app', 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: settings.cookieSecret,
  cookie: { maxAge: 1000*60*60},
  store: new MongoStore({
    url: settings.url,
    db: settings.db,
    host: settings.host
  })
}));

//app.use('/', routes);
app.use('/users', users);
//app.use('/wares', wares);
//app.use('/carts', carts);

app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
if(app.get('env') === 'development'){
  app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
app.listen(3000);