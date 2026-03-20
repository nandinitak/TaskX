import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { fetchTasks, updateTask } from '../store/slices/taskSlice'
import { Plus } from 'lucide-react'
import TaskModal from '../components/TaskModal'

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-200' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-200' },
  { id: 'review', title: 'Review', color: 'bg-yellow-200' },
  { id: 'done', title: 'Done', color: 'bg-green-200' }
]

export default function KanbanBoard() {
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
        <h1 className="text-2xl font-bold">Kanban Board</h1>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Task
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map(column => (
            <div key={column.id} className="bg-gray-50 rounded-lg p-4">
              <h3 className={`font-semibold mb-4 p-2 rounded ${column.color}`}>
                {column.title} ({getTasksByStatus(column.id).length})
              </h3>

              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-3 min-h-[200px]"
                  >
                    {getTasksByStatus(column.id).map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          >
                            <h4 className="font-medium mb-2">{task.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-2 py-1 rounded ${
                                task.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {task.priority}
                              </span>
                              {task.assignedTo?.length > 0 && (
                                <div className="flex -space-x-2">
                                  {task.assignedTo.slice(0, 3).map(user => (
                                    <div
                                      key={user._id}
                                      className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs border-2 border-white"
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
