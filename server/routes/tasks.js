const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { auth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Get all tasks
router.get('/', auth, async (req, res) => {
  try {
    const { status, priority, assignedTo } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;

    const tasks = await Task.find(filter)
      .populate('assignedTo', 'name email avatar')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create task
router.post('/', auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      createdBy: req.user._id
    });

    await task.save();
    await task.populate('assignedTo createdBy', 'name email avatar');

    // Create notifications for assigned users
    if (task.assignedTo && task.assignedTo.length > 0) {
      const notifications = task.assignedTo.map(user => ({
        user: user._id,
        type: 'task-assigned',
        message: `You have been assigned to task: ${task.title}`,
        task: task._id
      }));
      await Notification.insertMany(notifications);

      // Emit socket event
      const io = req.app.get('io');
      task.assignedTo.forEach(user => {
        io.to(user._id.toString()).emit('notification', {
          type: 'task-assigned',
          message: `You have been assigned to task: ${task.title}`,
          task: task
        });
      });
    }

    // Emit task created event
    req.app.get('io').emit('task-created', task);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update task
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedTo createdBy', 'name email avatar');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Emit socket event
    req.app.get('io').emit('task-updated', task);

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    req.app.get('io').emit('task-deleted', { id: req.params.id });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload attachment
router.post('/:id/attachments', auth, upload.single('file'), async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.attachments.push({
      filename: req.file.originalname,
      path: req.file.path
    });

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get task analytics
router.get('/analytics/stats', auth, async (req, res) => {
  try {
    const stats = await Task.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const priorityStats = await Task.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({ statusStats: stats, priorityStats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
