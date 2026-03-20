import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTasks, deleteTask } from '../store/slices/taskSlice'
import { Plus, Trash2, Edit } from 'lucide-react'
import TaskModal from '../components/TaskModal'
import { format } from 'date-fns'

export default function TaskList() {
  const dispatch = useDispatch()
  const { tasks, loading } = useSelector(state => state.tasks)
  const [showModal, setShowModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [filters, setFilters] = useState({ status: '', priority: '' })

  useEffect(() => {
    dispatch(fetchTasks(filters))
  }, [dispatch, filters])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id))
    }
  }

  const handleEdit = (task) => {
    setSelectedTask(task)
    setShowModal(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <button onClick={() => { setSelectedTask(null); setShowModal(true) }} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Task
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex gap-4">
          <select
            className="input"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>

          <select
            className="input"
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Task Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Priority</th>
              <th className="text-left p-3">Assigned To</th>
              <th className="text-left p-3">Due Date</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="text-center p-4">Loading...</td></tr>
            ) : tasks.length === 0 ? (
              <tr><td colSpan="6" className="text-center p-4">No tasks found</td></tr>
            ) : (
              tasks.map(task => (
                <tr key={task._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{task.title}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      task.status === 'done' ? 'bg-green-100 text-green-800' :
                      task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      task.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                      task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="p-3">
                    {task.assignedTo?.map(u => u.name).join(', ') || 'Unassigned'}
                  </td>
                  <td className="p-3">
                    {task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : '-'}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(task)} className="text-blue-600 hover:text-blue-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(task._id)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && <TaskModal task={selectedTask} onClose={() => { setShowModal(false); setSelectedTask(null) }} />}
    </div>
  )
}
