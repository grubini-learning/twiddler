const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts');

router.get('/posts', postController.getPosts);

module.exports = router;