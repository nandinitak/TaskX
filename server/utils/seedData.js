// Demo data with Indian names for testing
const demoUsers = [
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@taskx.com',
    password: 'demo123',
    role: 'admin'
  },
  {
    name: 'Rahul Verma',
    email: 'rahul.verma@taskx.com',
    password: 'demo123',
    role: 'manager'
  },
  {
    name: 'Ananya Patel',
    email: 'ananya.patel@taskx.com',
    password: 'demo123',
    role: 'user'
  },
  {
    name: 'Arjun Singh',
    email: 'arjun.singh@taskx.com',
    password: 'demo123',
    role: 'user'
  },
  {
    name: 'Sneha Reddy',
    email: 'sneha.reddy@taskx.com',
    password: 'demo123',
    role: 'user'
  }
];

const demoTasks = [
  {
    title: 'Design new landing page',
    description: 'Create a modern and responsive landing page for the new product launch',
    status: 'in-progress',
    priority: 'high',
    difficulty: 'medium',
    tags: ['design', 'frontend', 'ui/ux']
  },
  {
    title: 'Fix login authentication bug',
    description: 'Users are experiencing issues with Google OAuth login',
    status: 'todo',
    priority: 'urgent',
    difficulty: 'hard',
    tags: ['bug', 'backend', 'security']
  },
  {
    title: 'Update API documentation',
    description: 'Add documentation for new endpoints and update existing ones',
    status: 'review',
    priority: 'medium',
    difficulty: 'easy',
    tags: ['documentation', 'api']
  },
  {
    title: 'Implement dark mode',
    description: 'Add dark mode toggle to the application settings',
    status: 'todo',
    priority: 'low',
    difficulty: 'medium',
    tags: ['feature', 'ui', 'enhancement']
  },
  {
    title: 'Database optimization',
    description: 'Optimize MongoDB queries for better performance',
    status: 'done',
    priority: 'high',
    difficulty: 'hard',
    tags: ['database', 'performance', 'backend']
  },
  {
    title: 'Setup CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    status: 'in-progress',
    priority: 'medium',
    difficulty: 'medium',
    tags: ['devops', 'automation']
  },
  {
    title: 'Mobile app wireframes',
    description: 'Create wireframes for the mobile version of the application',
    status: 'todo',
    priority: 'medium',
    difficulty: 'easy',
    tags: ['design', 'mobile', 'planning']
  },
  {
    title: 'User feedback analysis',
    description: 'Analyze user feedback from the last sprint and create action items',
    status: 'review',
    priority: 'low',
    difficulty: 'easy',
    tags: ['research', 'analysis']
  },
  {
    title: 'Payment gateway integration',
    description: 'Integrate Razorpay payment gateway for subscription plans',
    status: 'in-progress',
    priority: 'urgent',
    difficulty: 'hard',
    tags: ['backend', 'payment', 'integration']
  },
  {
    title: 'Email notification system',
    description: 'Setup automated email notifications for task assignments',
    status: 'done',
    priority: 'medium',
    difficulty: 'medium',
    tags: ['backend', 'notifications', 'email']
  },
  {
    title: 'Performance testing',
    description: 'Conduct load testing and identify bottlenecks',
    status: 'todo',
    priority: 'high',
    difficulty: 'medium',
    tags: ['testing', 'performance']
  },
  {
    title: 'Social media integration',
    description: 'Add share functionality for LinkedIn and Twitter',
    status: 'todo',
    priority: 'low',
    difficulty: 'easy',
    tags: ['feature', 'social', 'integration']
  }
];

module.exports = { demoUsers, demoTasks };
