const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  text: {
    type: String,
    minlength: 1,
  },
  avatar: {
    type: String,
  },
  username: {
    type: String,
  },
  name: {
    type: String,
  },
  photo: {
    type: String,
  },
  title: {
    type: String,
    maxlength: 40,
  },
  tags: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: [String],
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        minlength: 1,
      },
      avatar: {
        type: String,
      },
      username: {
        type: String,
      },
      name: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  //retweets
});

module.exports = Post = mongoose.model('post', PostSchema);
