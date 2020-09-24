const { Mongoose, Types } = require('mongoose');
const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = (req, res, next) => {
  Post.aggregate([{ $lookup: { from: 'users', localField: 'creator', foreignField: '_id', as: 'owner' } }])
    .then(posts => {
      if (!posts) {
        const error = new Error('Posts could not be fetched');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Tweets retrieved succesfully', posts });
    })
    .catch(error => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.postPost = (req, res, next) => {
  const { user, message, created_at } = req.body;
  User.findOne({ username: user })
    .then(user => user)
    .then(user => {
      const newPost = new Post({
        content: message,
        created_at,
        creator: user._id
      });
      user.messages.push(newPost);
      user.save();
      return newPost.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Post created successfully'
      });
    })
    .catch(error => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};