const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
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