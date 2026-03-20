import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { fetchTasks, updateTask } from '../store/slices/taskSlice'
import { Plus } from 'lucide-react'
import TaskModal from '../components/TaskModal'

const columns = [
  { id: 'todo', title: '📋 To Do', color: 'bg-gradient-to-br from-gray-100 to-gray-200', badge: 'bg-gray-500' },
  { id: 'in-progress', title: '⚡ In Progress', color: 'bg-gradient-to-br from-blue-100 to-blue-200', badge: 'bg-blue-500' },
  { id: 'review', title: '👀 Review', color: 'bg-gradient-to-br from-yellow-100 to-yellow-200', badge: 'bg-yellow-500' },
  { id: 'done', title: '✅ Completed', color: 'bg-gradient-to-br from-green-100 to-green-200', badge: 'bg-green-500' }
]

export default function BoardView() {
  const dispatch = useDispatch()
  const { tasks } = useSelector(state => state.tasks)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const onDragEnd = (result) => {
    if (!result.destination) return

    const taskId = result.draggableId
    const newStatus = result.destination.droppableId

    dispatch(updateTask({ id: taskId, updates: { status: newStatus } }))
  }

  const getTasksByStatus = (status) => tasks.filter(t => t.status === status)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Board View</h1>
          <p className="text-gray-600 mt-1">Drag and drop tasks to update their status</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow">
          <Plus className="w-5 h-5" />
          Create Task
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map(column => (
            <div key={column.id} className="bg-white rounded-xl shadow-md p-4 border-2 border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-800">
                  {column.title}
                </h3>
                <span className={`${column.badge} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                  {getTasksByStatus(column.id).length}
                </span>
              </div>

              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-3 min-h-[300px]"
                  >
                    {getTasksByStatus(column.id).map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white p-4 rounded-lg border-2 transition-all duration-200 ${
                              snapshot.isDragging 
                                ? 'shadow-2xl border-primary rotate-2 scale-105' 
                                : 'shadow-sm hover:shadow-lg border-gray-200 hover:border-primary/50'
                            }`}
                          >
                            <h4 className="font-semibold mb-2 text-gray-900">{task.title}</h4>
                            {task.description && (
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                            )}
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                task.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                                task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {task.priority}
                              </span>
                              {task.assignedTo?.length > 0 && (
                                <div className="flex -space-x-2">
                                  {task.assignedTo.slice(0, 3).map(user => (
                                    <div
                                      key={user._id}
                                      className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-md"
                                      title={user.name}
                                    >
                                      {user.name[0]}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {showModal && <TaskModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
