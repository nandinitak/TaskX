import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTasks } from '../store/slices/taskSlice'
import { CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const dispatch = useDispatch()
  const { tasks } = useSelector(state => state.tasks)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const myTasks = tasks.filter(t => t.assignedTo?.some(u => u._id === user.id))
  const stats = {
    total: myTasks.length,
    completed: myTasks.filter(t => t.status === 'done').length,
    inProgress: myTasks.filter(t => t.status === 'in-progress').length,
    pending: myTasks.filter(t => t.status === 'todo').length
  }

  const statCards = [
    { label: 'Total Tasks', value: stats.total, icon: TrendingUp, color: 'bg-blue-500' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'bg-green-500' },
    { label: 'In Progress', value: stats.inProgress, icon: Clock, color: 'bg-yellow-500' },
    { label: 'Pending', value: stats.pending, icon: AlertCircle, color: 'bg-red-500' }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}! 👋</h1>
        <p className="text-gray-600 text-lg">Here's your productivity overview for today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map(({ label, value, icon: Icon, color }, index) => (
          <div 
            key={label} 
            className="card hover:scale-105 transition-all duration-300 cursor-pointer animate-slideIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">{label}</p>
                <p className="text-4xl font-bold mt-3 text-gray-900">{value}</p>
              </div>
              <div className={`${color} p-4 rounded-xl shadow-lg`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tasks */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recent Tasks</h2>
            <p className="text-sm text-gray-500 mt-1">{myTasks.length} tasks assigned to you</p>
          </div>
          <div className="bg-primary/10 px-4 py-2 rounded-lg">
            <span className="text-primary font-bold text-lg">{myTasks.length}</span>
          </div>
        </div>
        {myTasks.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-600 text-lg font-medium">No tasks assigned yet</p>
            <p className="text-gray-500 text-sm mt-2">Start by creating a new task from the Board View!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {myTasks.slice(0, 6).map((task, index) => (
              <div 
                key={task._id} 
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:from-primary/5 hover:to-secondary/5 transition-all duration-200 border-2 border-transparent hover:border-primary/20 cursor-pointer group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-2 h-12 rounded-full ${
                    task.priority === 'urgent' ? 'bg-red-500' :
                    task.priority === 'high' ? 'bg-orange-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{task.title}</h3>
                    <p className="text-sm text-gray-600 capitalize mt-1">
                      <span className="inline-flex items-center gap-1">
                        {task.status === 'done' && '✅'}
                        {task.status === 'in-progress' && '⚡'}
                        {task.status === 'review' && '👀'}
                        {task.status === 'todo' && '📋'}
                        {task.status.replace('-', ' ')}
                      </span>
                    </p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-xs font-bold shadow-sm ${
                  task.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                  task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
