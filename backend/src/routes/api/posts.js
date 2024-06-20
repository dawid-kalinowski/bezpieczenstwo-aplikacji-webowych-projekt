const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts
// @desc    Create a post
// @access  Public
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new Post({
      title,
      content
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
