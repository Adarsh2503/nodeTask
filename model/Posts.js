const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  message: {
    type: String
  },
  time: {
    type: String
  },
  date: {
    type: String
  }
});

module.exports = Posts= mongoose.model('post1', PostSchema);