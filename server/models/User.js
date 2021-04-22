const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  name: Object,
});

mongoose.model('users', userSchema);
