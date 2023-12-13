// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// @route GET api/comments
// @desc Get all comments
// @access Public
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    if (!comments) throw Error('No comments found');
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

// @route POST api/comments
// @desc Create a comment
// @access Public
router.post('/', async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const comment = await newComment.save();
    if (!comment) throw Error('Something went wrong saving the comment');
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

// @route DELETE api/comments/:id
// @desc Delete a comment
// @access Public
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) throw Error('No comment found');
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

module.exports = router;
