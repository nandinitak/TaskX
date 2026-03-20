const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'review', 'done'],
    default: 'todo'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  dueDate: {
    type: Date
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  timeTracking: {
    totalTime: { type: Number, default: 0 },
    isRunning: { type: Boolean, default: false },
    startTime: { type: Date }
  },
  attachments: [{
    filename: String,
    path: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Calculate priority prediction
taskSchema.virtual('priorityPrediction').get(function() {
  if (!this.dueDate) return 'normal';
  
  const daysUntilDue = Math.ceil((this.dueDate - new Date()) / (1000 * 60 * 60 * 24));
  const difficultyScore = { easy: 1, medium: 2, hard: 3 }[this.difficulty] || 2;
  
  if (daysUntilDue < 2 || (daysUntilDue < 5 && difficultyScore >= 2)) return 'urgent';
  if (daysUntilDue < 7 || this.priority === 'high') return 'important';
  return 'normal';
});

taskSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Task', taskSchema);
