const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts');

router.get('/posts', postController.getPosts);
router.post('/addPost', postController.postPost);

module.exports = router;