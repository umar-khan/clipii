const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  password: String,
  profilePictureUrl: String
}, {
  timestamps: true
});


// Create a model using schema.
const User = mongoose.model('User', userSchema);

// Make this available to our Node applications.
module.exports = User;