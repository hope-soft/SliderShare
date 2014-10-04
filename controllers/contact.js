var user = require('../models/user');
var contact = require('../models/contact');
var secrets = require('../config/secrets');
var nodemailer = require("nodemailer");
var async = require('async');


/**
 * POST /contact
 * Send a contact form via Nodemailer.
 * @param email
 * @param Subject
 * @param message
 */
exports.postContact = function(req, res) {
  
  req.assert('subject', 'subject cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('message', 'Message cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('http://' + req.headers.host + '/#/contact');
  }

  var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'SendGrid',
    auth: {
      user: secrets.sendgrid.user,
      pass: secrets.sendgrid.password
    }
  });


  smtpTransport.sendMail({
    from: "info@displayshare.nl", // sender address
    to: req.body.email, // comma separated list of receivers
    subject: subject + " - Display Share", // Subject line
    text: req.body.message // plaintext body
  }, function(error, response){
     if(error){
        req.flash('success', { msg: error });
        res.redirect('http://' + req.headers.host + '/#/contact');
     }else{
        res.redirect('http://' + req.headers.host + '/#/contact');
        // var newcontact = new Contacts({
        //     messageId: response.messageId,
        //     name: req.body.name,
        //     email: req.body.email,
        //     desc: req.body.message
        //   });

        // newcontact.save(function(err){
        //   if(err) throw err;
        //   //res.json(resp);
        //   console.log("Message sent: " + response.message);
        //   req.flash('success', { msg: 'Email has been sent successfully!' });
        //   res.redirect('http://' + req.headers.host + '/#/contact');
        // });    
      }
  });


};