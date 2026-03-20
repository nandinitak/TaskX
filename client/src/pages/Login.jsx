import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/slices/authSlice'
import { CheckCircle2, Users, Zap } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector(state => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(login(formData)).unwrap()
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message || 'Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center font-black text-white text-3xl shadow-xl">
                X
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">TaskX</h1>
            </div>
            <p className="text-gray-600 text-lg font-medium">Where Teams Get Things Done</p>
          </div>

          <div className="card">
            <h2 className="text-2xl font-semibold mb-6">Welcome Back</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Email Address</label>
                <input
                  type="email"
                  className="input"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              
              <button type="submit" className="btn-primary w-full mt-6" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            
            <p className="text-center mt-6 text-sm text-gray-600">
              Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Create Account</Link>
            </p>
          </div>

          {/* Developer Info */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Developed by <span className="font-semibold text-primary">Sumant Yadav</span></p>
            <p className="mt-1">sumantyadav3086@gmail.com | +91 9599617479</p>
          </div>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-secondary p-12 text-white items-center justify-center">
        <div className="max-w-md">
          <h2 className="text-4xl font-bold mb-6">Task Management, Reimagined</h2>
          <p className="text-lg mb-8 text-blue-100">
            Organize. Collaborate. Execute. Smart task management for modern teams.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Real-Time Collaboration</h3>
                <p className="text-blue-100">Work together seamlessly with instant updates and notifications</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Users className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Smart Workload Management</h3>
                <p className="text-blue-100">Balance tasks efficiently across your team members</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Zap className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">AI-Powered Insights</h3>
                <p className="text-blue-100">Intelligent priority prediction and productivity analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
