const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model('Message', messageSchema);