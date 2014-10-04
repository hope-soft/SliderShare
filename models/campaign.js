var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator').validate;


var layerSchema = Schema({
  order: Number,
  media: String,
  content: String,
  x: Number, y: Number, w: Number, h:Number,
  position: String, // "+=0" is default and means at the end of last chain, can be label or relative to label
  duration: Number, // duration of this layer
});

var displaySchema = Schema({
  display_id: {type: Schema.Types.ObjectId, ref: 'display'},
},{ _id : false});

var campaignSchema = Schema({
  old_id: Number,
  user_id  : { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  duration: Number,
  layer: [layerSchema],
  display: [displaySchema],
  start_date: Date,
  end_date: Date,
  publish: Boolean
}, {collection: 'campaign'});

module.exports = mongoose.model('campaign', campaignSchema);
