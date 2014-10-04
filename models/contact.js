var mongoose = require('mongoose');


var contactSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  subject: String,
  message: String
}, {collection: 'contact'});



module.exports = mongoose.model('contact', contactSchema);
