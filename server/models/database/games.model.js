const mongoose = require('mongoose');

const { Schema } = mongoose;

const gamesSchema = new Schema({
  roomName: String,
  player1: {
    id: { type: Schema.Types.ObjectId, ref: 'users' },
    username: { type: String, default: 'default name' },
    score: { type: Number, min: 0, default: 0 },
    elo: { type: Number, default: 1000 },
    numericalOrder: { type: Number, default: 1 },
  },
  player2: {
    id: { type: Schema.Types.ObjectId, ref: 'users' },
    username: { type: String, default: 'default name' },
    score: { type: Number, min: 0, default: 0 },
    elo: { type: Number, default: 1000 },
    numericalOrder: { type: Number, default: 2 },
  },
  turn: { type: Number, default: 1 },
});

const gamesModel = mongoose.model('games', gamesSchema);

module.exports = gamesModel;
