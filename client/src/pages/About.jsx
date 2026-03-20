import { Mail, Phone, Code, Database, Layout, Server } from 'lucide-react'

export default function About() {
  const technologies = [
    { name: 'React 18', icon: Layout, color: 'text-blue-500' },
    { name: 'Node.js', icon: Server, color: 'text-green-500' },
    { name: 'MongoDB', icon: Database, color: 'text-green-600' },
    { name: 'Express.js', icon: Code, color: 'text-gray-700' }
  ]

  const features = [
    'Real-Time Collaboration with WebSockets',
    'AI-Powered Task Priority Prediction',
    'Smart Workload Balancing',
    'Drag & Drop Kanban Board',
    'Role-Based Access Control',
    'Task Discussion & File Sharing',
    'Productivity Analytics & Heatmap',
    'Time Tracking & Notifications'
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-6 bg-gradient-to-br from-gray-50 to-white border-2 border-primary/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center font-black text-white text-3xl shadow-xl">
            X
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">TaskX</h1>
            <p className="text-sm text-gray-600 font-medium">Task Management, Reimagined</p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>TaskX</strong> is a professional, enterprise-grade task management system built with the MERN stack. 
          It features real-time collaboration, intelligent task prioritization, and advanced team 
          productivity tools designed for modern teams.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The application demonstrates best practices in full-stack development, including secure 
          authentication, real-time communication, responsive design, and scalable architecture.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">Organize</span>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">Collaborate</span>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">Execute</span>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="card mb-6">
        <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {technologies.map(({ name, icon: Icon, color }) => (
            <div key={name} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <Icon className={`w-12 h-12 ${color} mb-2`} />
              <span className="text-sm font-medium text-gray-700">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="card mb-6">
        <h2 className="text-2xl font-bold mb-4">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Developer Info */}
      <div className="card bg-gradient-to-br from-primary to-secondary text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center font-black text-gray-900 text-2xl shadow-lg">
            X
          </div>
          <div>
            <h2 className="text-2xl font-bold">TaskX</h2>
            <p className="text-sm text-blue-100">Where Teams Get Things Done</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Developed by Sumant Yadav</h3>
            <p className="text-blue-100 mb-4">
              Full Stack Developer specializing in MERN Stack development. Passionate about 
              building scalable, user-friendly web applications with modern technologies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="mailto:sumantyadav3086@gmail.com"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-lg transition-colors"
            >
              <Mail className="w-5 h-5" />
              <div>
                <div className="text-xs text-blue-100">Email</div>
                <div className="font-medium">sumantyadav3086@gmail.com</div>
              </div>
            </a>

            <a 
              href="tel:+919599617479"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              <div>
                <div className="text-xs text-blue-100">Phone</div>
                <div className="font-medium">+91 9599617479</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="card mt-6">
        <h2 className="text-2xl font-bold mb-4">Project Information</h2>
        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">Version:</span> 1.0.0</p>
          <p><span className="font-semibold">License:</span> MIT</p>
          <p><span className="font-semibold">Last Updated:</span> {new Date().toLocaleDateString()}</p>
          <p><span className="font-semibold">Database:</span> MongoDB Atlas (Cloud)</p>
        </div>
      </div>
    </div>
  )
}
