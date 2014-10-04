var Campaign = require('../models/campaign');

/**
 * GET /
 * campaign page.
 */

exports.index = function(req, res) {
	console.log('campaign page');
  	res.render('campaign', {
    title: 'Campaign'
  });
};

exports.getById = function(req, res){
	var campaignId = req.params.id;
	Campaign.findOne({_id:campaignId},function(err, campaignDetail) {
    	res.send(JSON.stringify(campaignDetail));
  });
};

exports.getList = function(req, res){
	Campaign.find({user_id:req.user._id},function(err, campaigns) {
    	res.send(JSON.stringify(campaigns));
  });
};