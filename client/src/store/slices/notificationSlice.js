import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

const initialState = {
  notifications: [],
  unreadCount: 0
}

export const fetchNotifications = createAsyncThunk('notifications/fetch', async () => {
  const { data } = await api.get('/notifications')
  return data
})

export const markAsRead = createAsyncThunk('notifications/markAsRead', async (id) => {
  const { data } = await api.put(`/notifications/${id}/read`)
  return data
})

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload)
      state.unreadCount += 1
    },
    clearNotifications: (state) => {
      state.notifications = []
      state.unreadCount = 0
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload
        state.unreadCount = action.payload.filter(n => !n.read).length
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(n => n._id === action.payload._id)
        if (index !== -1) {
          state.notifications[index] = action.payload
          state.unreadCount = Math.max(0, state.unreadCount - 1)
        }
      })
  }
})

export const { addNotification, clearNotifications } = notificationSlice.actions
export default notificationSlice.reducer
