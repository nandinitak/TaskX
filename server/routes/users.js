const express = require('express');
const User = require('../models/User');
const Task = require('../models/Task');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all users (with workload info)
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    // Calculate workload for each user
    const usersWithWorkload = await Promise.all(
      users.map(async (user) => {
        const taskCount = await Task.countDocuments({
          assignedTo: user._id,
          status: { $in: ['todo', 'in-progress'] }
        });
        
        return {
          ...user.toObject(),
          workload: taskCount
        };
      })
    );

    res.json(usersWithWorkload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const tasks = await Task.find({ assignedTo: user._id });
    const completedTasks = await Task.countDocuments({
      assignedTo: user._id,
      status: 'done'
    });

    res.json({
      ...user.toObject(),
      totalTasks: tasks.length,
      completedTasks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, email, role, availability } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, availability },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user productivity heatmap
router.get('/:id/heatmap', auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.params.id,
      completedAt: { $exists: true }
    }).select('completedAt');

    const heatmapData = tasks.reduce((acc, task) => {
      const date = task.completedAt.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    res.json(heatmapData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
