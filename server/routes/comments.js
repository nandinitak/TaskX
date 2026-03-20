const express = require('express');
const Comment = require('../models/Comment');
const Notification = require('../models/Notification');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get comments for a task
router.get('/task/:taskId', auth, async (req, res) => {
  try {
    const comments = await Comment.find({ task: req.params.taskId })
      .populate('user', 'name email avatar')
      .populate('mentions', 'name email')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create comment
router.post('/', auth, async (req, res) => {
  try {
    const { task, content, mentions } = req.body;

    const comment = new Comment({
      task,
      user: req.user._id,
      content,
      mentions: mentions || []
    });

    await comment.save();
    await comment.populate('user mentions', 'name email avatar');

    // Create notifications for mentions
    if (mentions && mentions.length > 0) {
      const notifications = mentions.map(userId => ({
        user: userId,
        type: 'mention',
        message: `${req.user.name} mentioned you in a comment`,
        task
      }));
      await Notification.insertMany(notifications);

      // Emit socket event
      const io = req.app.get('io');
      mentions.forEach(userId => {
        io.to(userId.toString()).emit('notification', {
          type: 'mention',
          message: `${req.user.name} mentioned you in a comment`,
          comment
        });
      });
    }

    // Emit comment created event
    req.app.get('io').emit('comment-created', comment);

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete comment
router.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found or unauthorized' });
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
