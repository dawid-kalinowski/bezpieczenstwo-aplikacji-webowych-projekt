const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  oauthID: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  email: {
    type: String
  }
});

module.exports = mongoose.model('User', UserSchema);
