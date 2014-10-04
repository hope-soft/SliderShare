var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Campaign = mongoose.model('campaign');

router.route('/').get(function(req, res) {
  res.render('campaign');
});

router.route('/list').get(function(req, res) {
  Campaign.find({user_id:req.user._id},function(err,campaigns) {
    res.send(JSON.stringify(campaigns));
  });
});

router.route('/:id').get(function(req, res) {
  Campaign.findOne({user_id:req.user._id, _id:req.params.id },function(err,campaign) {
    res.send(JSON.stringify(campaign));
  });
});

module.exports = router;
