const mongoose = require('mongoose');

const { Schema } = mongoose;

const usersSchema = new Schema({
  username: String,
  password: String,
  elo: { type: Number, default: 1000 },
  created_at: { type: Date, default: Date.now() },
});

const usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;
