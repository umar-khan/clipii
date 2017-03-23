const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  team0: String,
  team0Logo: String,
  team1: String,
  team1Logo: String,
  league: String,
  leagueLogo: String,
  date: Date,
  user_id: {type: Schema.Types.ObjectId, ref: "User"}
}, {
  timestamps: true
});


// Create a model using schema.
const Game = mongoose.model('Game', gameSchema);

// Make this available to our Node applications.
module.exports = Game;