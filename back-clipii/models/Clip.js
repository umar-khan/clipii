const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clipSchema = new Schema({
  minute: Number,
  url: String,
  description: String,
  game_id: {type: Schema.Types.ObjectId, ref: "Game"},
  user_id: {type: Schema.Types.ObjectId, ref: "User"}
}, {
  timestamps: true
});


// Create a model using schema.
const Clip = mongoose.model('Clip', clipSchema);

// Make this available to our Node applications.
module.exports = Clip;