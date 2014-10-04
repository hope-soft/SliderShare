var _ = require('underscore');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/user');
var secrets = require('../config/secrets');

/**
 * GET /login
 * Login page.
 */

 exports.getLogin = function(req, res) {
  if (req.user) return res.redirect('/');
  res.render('account/login.ejs', {
    title: 'Login'
  });
};

/**
 * POST /login
 * Sign in using email and password.
 * @param email
 * @param password
 */

 exports.postLogin = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }


  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      req.flash('errors', { msg: info.message });
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      req.flash('success', { msg: 'Success! You are logged in.' });
      
      req.session.email=req.body.email;
      req.session.role=user.role;
      res.redirect('/');
    });
  })(req, res, next);
};



 exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

