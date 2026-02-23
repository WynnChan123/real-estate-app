const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  title : { type: String },
  created_at : { type: Date, default: Date.now },
})

module.exports = mongoose.model('Session', sessionSchema);