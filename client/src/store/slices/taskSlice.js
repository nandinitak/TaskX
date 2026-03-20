import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

const initialState = {
  tasks: [],
  loading: false,
  error: null
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (filters = {}) => {
  const { data } = await api.get('/tasks', { params: filters })
  return data
})

export const createTask = createAsyncThunk('tasks/createTask', async (taskData) => {
  const { data } = await api.post('/tasks', taskData)
  return data
})

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, updates }) => {
  const { data } = await api.put(`/tasks/${id}`, updates)
  return data
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await api.delete(`/tasks/${id}`)
  return id
})

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskCreated: (state, action) => {
      state.tasks.unshift(action.payload)
    },
    taskUpdated: (state, action) => {
      const index = state.tasks.findIndex(t => t._id === action.payload._id)
      if (index !== -1) state.tasks[index] = action.payload
    },
    taskDeleted: (state, action) => {
      state.tasks = state.tasks.filter(t => t._id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t._id === action.payload._id)
        if (index !== -1) state.tasks[index] = action.payload
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(t => t._id !== action.payload)
      })
  }
})

export const { taskCreated, taskUpdated, taskDeleted } = taskSlice.actions
export default taskSlice.reducer
