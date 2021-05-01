const { Schema, model } = require('mongoose');
const gameSchema = new Schema({
  name: String,
  questions: Array,
});

const Game = model('Game', gameSchema);
module.exports = Game;
