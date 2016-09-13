'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  email: {
    type: String,
    unique: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;