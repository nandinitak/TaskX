import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#4F46E5', '#6366F1', '#FACC15', '#22C55E']

export default function Analytics() {
  const { tasks } = useSelector(state => state.tasks)
  const [stats, setStats] = useState({ status: [], priority: [] })

  useEffect(() => {
    const statusData = [
      { name: 'To Do', value: tasks.filter(t => t.status === 'todo').length },
      { name: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length },
      { name: 'Review', value: tasks.filter(t => t.status === 'review').length },
      { name: 'Done', value: tasks.filter(t => t.status === 'done').length }
    ]

    const priorityData = [
      { name: 'Low', value: tasks.filter(t => t.priority === 'low').length },
      { name: 'Medium', value: tasks.filter(t => t.priority === 'medium').length },
      { name: 'High', value: tasks.filter(t => t.priority === 'high').length },
      { name: 'Urgent', value: tasks.filter(t => t.priority === 'urgent').length }
    ]

    setStats({ status: statusData, priority: priorityData })
  }, [tasks])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Task Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.status}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.status.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Priority Distribution */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Priority Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.priority}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Total Tasks</h3>
          <p className="text-4xl font-bold text-primary">{tasks.length}</p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Completion Rate</h3>
          <p className="text-4xl font-bold text-green-600">
            {tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 100) : 0}%
          </p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Urgent Tasks</h3>
          <p className="text-4xl font-bold text-red-600">
            {tasks.filter(t => t.priority === 'urgent').length}
          </p>
        </div>
      </div>
    </div>
  )
}
