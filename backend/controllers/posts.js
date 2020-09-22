const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      console.log(posts);
    });
};