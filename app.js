var express = require('express');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var csrf = require('lusca').csrf();
var methodOverride = require('method-override');

var _ = require('lodash');
var MongoStore = require('connect-mongo')({ session: session });
var flash = require('express-flash');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
var connectAssets = require('connect-assets');





/**
 * API keys and Passport configuration.
 */

var secrets = require('./config/secrets');
var passportConf = require('./config/passport');


/**
 * Create Express server.
 */

var app = express();

/**
 * Connect to MongoDB.
 */

mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

var hour = 3600000;
var day = hour * 24;
var week = day * 7;

/**
 * CSRF whitelist.
 */

var csrfExclude = ['/url1', '/url2'];


/**
 * Express configuration.
 */

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(compress());
app.use(connectAssets({
  paths: [path.join(__dirname, 'public/css'), path.join(__dirname, 'public/js')],
  helperContext: app.locals
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secrets.sessionSecret,
  store: new MongoStore({
    url: secrets.db,
    auto_reconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
  // CSRF protection.
  if (_.contains(csrfExclude, req.path)) return next();
  csrf(req, res, next);
});
app.use(function(req, res, next) {
  // Make user object available in templates.
  res.locals.user = req.user;
  next();
});
app.use(function(req, res, next) {
  // Remember original destination before login.
  var path = req.path.split('/')[1];
  if (/auth|login|logout|signup|fonts|favicon/i.test(path)) {
    return next();
  }
  req.session.returnTo = req.path;
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: week }));






/**
 * Controllers (route handlers).
 */

var homeController = require('./controllers/home');
var loginController = require('./controllers/login');
var campaignController = require('./controllers/campaign')
var userController = require('./controllers/user')
var contactController = require('./controllers/contact')



/**
 * Application routes.
 */

app.get('/', homeController.index);
app.get('/login', loginController.getLogin);
app.post('/login', loginController.postLogin);
app.get('/logout', loginController.logout);

// app.get('/campaign', passportConf.isAuthenticated, campaignController.index);
app.get('/campaigns', passportConf.isAuthenticated, campaignController.getList);
app.get('/campaign/view/:id', passportConf.isAuthenticated, campaignController.getById);

app.post('/contact', passportConf.isAuthenticated, contactController.postContact);


app.get('/admin/users', passportConf.isAuthenticated, userController.getList);
app.get('/admin/user/view/:userId', passportConf.isAuthenticated, userController.findUser);
app.get('/account/user/edit/:userId', passportConf.isAuthenticated, userController.getUser);
app.post('/account/user/edit/', passportConf.isAuthenticated, userController.postUpdateUser);

app.get('/forgot', loginController.getForgot);
app.post('/forgot', loginController.postForgot);
app.get('/reset/:token', loginController.getReset);
app.post('/reset/:token', loginController.postReset);
app.get('/signup', loginController.getSignup);
app.post('/signup', loginController.postSignup);



app.get('/admin/user/profile', passportConf.isAuthenticated, loginController.getProfile);
app.get('/account', passportConf.isAuthenticated, loginController.getAccount);
app.post('/account/profile', passportConf.isAuthenticated, loginController.postUpdateProfile);
app.post('/account/password', passportConf.isAuthenticated, loginController.postUpdatePassword);
app.post('/account/password/:userId', passportConf.isAuthenticated, loginController.postUpdateUserPassword);
app.post('/account/delete', passportConf.isAuthenticated, loginController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConf.isAuthenticated, loginController.getOauthUnlink);



/**
 * OAuth routes for sign-in.
 */


app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});

app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});


/**
 * 500 Error Handler.
 * As of Express 4.0 it must be placed at the end, after all routes.
 */

app.use(errorHandler());


/**
 * Start Express server.
 */

app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});


module.exports = app;
