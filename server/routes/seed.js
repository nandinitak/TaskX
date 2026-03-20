const express = require('express');
const User = require('../models/User');
const Task = require('../models/Task');
const { demoUsers, demoTasks } = require('../utils/seedData');

const router = express.Router();

// Seed demo data
router.post('/demo-data', async (req, res) => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});

    // Create demo users
    const createdUsers = await User.insertMany(demoUsers);
    console.log('Demo users created:', createdUsers.length);

    // Assign tasks to users randomly
    const tasksWithAssignments = demoTasks.map(task => ({
      ...task,
      createdBy: createdUsers[0]._id,
      assignedTo: [createdUsers[Math.floor(Math.random() * createdUsers.length)]._id],
      dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date within 30 days
    }));

    const createdTasks = await Task.insertMany(tasksWithAssignments);
    console.log('Demo tasks created:', createdTasks.length);

    res.json({
      message: 'Demo data seeded successfully',
      users: createdUsers.length,
      tasks: createdTasks.length,
      credentials: {
        admin: { email: 'priya.sharma@taskflow.com', password: 'demo123' },
        manager: { email: 'rahul.verma@taskflow.com', password: 'demo123' },
        user: { email: 'ananya.patel@taskflow.com', password: 'demo123' }
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
