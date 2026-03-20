# 🚀 TaskX - Where Teams Get Things Done

> A professional, enterprise-grade task management system built with the MERN stack, featuring real-time collaboration, intelligent task prioritization, and advanced team productivity tools.

**Tagline:** Task Management, Reimagined

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green.svg)](https://www.mongodb.com/mern-stack)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18+-blue.svg)](https://reactjs.org/)

## ✨ Key Features

### 🎯 Core Functionality
- **Secure Authentication** - JWT-based authentication with role-based access control
- **Real-Time Collaboration** - WebSocket-powered instant updates across all connected users
- **Smart Task Management** - Create, assign, track, and manage tasks with ease
- **Role-Based Dashboards** - Customized views for Admin, Manager, and Team Members
- **Advanced Analytics** - Comprehensive insights into team productivity and task metrics

### � aAdvanced Features
- **📋 Kanban Board** - Drag-and-drop interface with real-time synchronization
- **🤖 AI-Powered Priority Prediction** - Intelligent task urgency indicators
- **⚖️ Smart Workload Balancing** - Visual workload distribution across team members
- **� Taske Discussions** - Comment system with @mentions and file attachments
- **📊 Productivity Heatmap** - GitHub-style visualization of task completion patterns
- **⏱️ Time Tracking** - Built-in timer for accurate time management
- **🔔 Real-Time Notifications** - Instant alerts for task assignments and updates
- **📁 File Attachments** - Upload and share files directly within tasks

## 🛠️ Technology Stack

### Frontend
- **React 18** with Vite for lightning-fast development
- **Redux Toolkit** for state management
- **TailwindCSS** for modern, responsive UI
- **Socket.io Client** for real-time communication
- **React Beautiful DnD** for drag-and-drop functionality
- **Recharts** for data visualization

### Backend
- **Node.js** with Express.js framework
- **MongoDB Atlas** for cloud database
- **Socket.io** for WebSocket connections
- **JWT** for secure authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-app
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://sumant:sumant123@taskmdb.kf0edjz.mongodb.net/?appName=TaskMDB
   JWT_SECRET=sumant_task_manager_jwt_secret_key_2024_secure
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

6. **Load Demo Data (Optional)**
   
   To populate the app with sample tasks and users with Indian names:
   ```powershell
   Invoke-WebRequest -Uri "http://localhost:5000/api/seed/demo-data" -Method POST
   ```
   
   Demo Accounts (5 users, 12 tasks):
   - **Admin**: priya.sharma@taskx.com / demo123
   - **Manager**: rahul.verma@taskx.com / demo123
   - **User**: ananya.patel@taskx.com / demo123

## 📱 Application Structure

```
task-management-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store & slices
│   │   ├── services/      # API & Socket services
│   │   └── App.jsx        # Main app component
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── index.js          # Server entry point
├── uploads/              # File upload directory
└── package.json
```

## 🎨 Design System

**Modern Corporate Theme**
- Primary: `#4F46E5` (Indigo)
- Secondary: `#6366F1` (Light Indigo)
- Accent: `#FACC15` (Yellow)
- Background: `#F9FAFB` (Light Gray)
- Text: `#1F2937` (Dark Gray)

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks (with filters)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/:id/attachments` - Upload file

### Users
- `GET /api/users` - Get all users with workload
- `GET /api/users/:id` - Get user details
- `GET /api/users/:id/heatmap` - Get productivity heatmap

### Comments & Notifications
- `GET /api/comments/task/:taskId` - Get task comments
- `POST /api/comments` - Add comment
- `GET /api/notifications` - Get user notifications

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- CORS protection
- Secure file upload handling

## 👨‍💻 Developer

**Sumant Yadav**
- 📧 Email: sumantyadav3086@gmail.com
- 📱 Phone: +91 9599617479
- 💼 Full Stack Developer specializing in MERN Stack

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License

This project is licensed under the MIT License.

## � Deplowyment

### Deploy to Render

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create a new Web Service on Render**
   - Go to [render.com](https://render.com) and sign in
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will auto-detect the `render.yaml` configuration

3. **Set Environment Variables**
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret key
   - `CLIENT_URL` - Your Render app URL (e.g., https://taskx.onrender.com)
   - `NODE_ENV` - Set to `production`

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app

### Deploy to Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect the `vercel.json` configuration

3. **Set Environment Variables**
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret key
   - `CLIENT_URL` - Your Vercel app URL
   - `NODE_ENV` - Set to `production`

4. **Deploy**
   - Click "Deploy"
   - Your app will be live in minutes

**Note:** For Vercel, Socket.io may have limitations. Consider using Render for full-stack apps with WebSocket support.

## 🙏 Acknowledgments

Built with modern web technologies and best practices to deliver a professional, scalable task management solution for teams of all sizes.

---

**Made with ❤️ by Sumant Yadav**
