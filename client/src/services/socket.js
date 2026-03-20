import { io } from 'socket.io-client'
import { taskCreated, taskUpdated, taskDeleted } from '../store/slices/taskSlice'
import { addNotification } from '../store/slices/notificationSlice'
import toast from 'react-hot-toast'

let socket = null

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const initSocket = (userId, dispatch) => {
  socket = io(SOCKET_URL)

  socket.on('connect', () => {
    console.log('Socket connected')
    socket.emit('join-room', userId)
  })

  socket.on('task-created', (task) => {
    dispatch(taskCreated(task))
  })

  socket.on('task-updated', (task) => {
    dispatch(taskUpdated(task))
  })

  socket.on('task-deleted', ({ id }) => {
    dispatch(taskDeleted(id))
  })

  socket.on('notification', (notification) => {
    dispatch(addNotification(notification))
    toast.success(notification.message)
  })

  return socket
}

export const getSocket = () => socket

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
