var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator').validate;


var creditSchema = Schema({
  start_date: Date,
  end_date: Date,
  credits: Number
},{ _id : false});

var displaySchema = Schema({
  old_id: Number,
  user_id  : { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  logo: String, // image filename or something smart (don't know in nodejs)
  code: String,
  scope: String,
  layout: String,
  contact: String,
  address: String,
  postcode: String,
  lat: Number,
  lng: Number,
  info: String,
  opening: String,
  url: String,
  created: {type: Date, default: new Date()},
  credits: [creditSchema]
}, {collection: 'display'});


module.exports = mongoose.model('display', displaySchema);