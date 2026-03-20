import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import BoardView from './pages/BoardView'
import TaskList from './pages/TaskList'
import Analytics from './pages/Analytics'
import About from './pages/About'
import Layout from './components/Layout'
import { initSocket } from './services/socket'

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (user) {
      initSocket(user.id, dispatch)
    }
  }, [user, dispatch])

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      
      <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="board" element={<BoardView />} />
        <Route path="tasks" element={<TaskList />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
