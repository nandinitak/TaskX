import { useState, useEffect, useRef } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import { LayoutDashboard, Trello, ListTodo, BarChart3, Bell, LogOut, User, ChevronDown } from 'lucide-react'
import Footer from './Footer'

export default function Layout() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { user } = useSelector(state => state.auth)
  const { unreadCount } = useSelector(state => state.notifications)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileMenuRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/board', icon: Trello, label: 'Board View' },
    { path: '/tasks', icon: ListTodo, label: 'All Tasks' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/about', icon: User, label: 'About' }
  ]

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-primary to-secondary shadow-2xl flex flex-col">
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-black text-gray-900 text-xl shadow-lg">
              X
            </div>
            <h1 className="text-2xl font-bold text-white">TaskX</h1>
          </div>
          <p className="text-xs text-blue-100">Where Teams Get Things Done</p>
          
          <div className="mt-6 flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="w-10 h-10 rounded-full bg-accent text-gray-900 flex items-center justify-center font-bold text-lg shadow-lg">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{user?.name}</p>
              <span className="text-xs bg-accent text-gray-900 px-2 py-0.5 rounded font-medium">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center px-6 py-3 mx-3 my-1 rounded-lg transition-all duration-200 ${
                location.pathname === path 
                  ? 'bg-white text-primary shadow-lg font-semibold' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/20">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-3">
            <p className="text-xs text-blue-100 mb-1">Logged in as</p>
            <p className="text-sm font-semibold text-white truncate">{user?.email}</p>
          </div>
          <button
            onClick={() => dispatch(logout())}
            className="flex items-center justify-center w-full text-white hover:text-accent transition-colors font-medium bg-white/10 hover:bg-white/20 py-2.5 rounded-lg"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center border-b-2 border-primary/10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Welcome back, {user?.name}!</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative hover:bg-primary/10 p-2 rounded-lg transition-all duration-200 group">
              <Bell className="w-6 h-6 text-gray-600 group-hover:text-primary" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="hidden md:flex items-center gap-3 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-primary/20"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-sm font-bold shadow-md">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <div className="text-sm text-left">
                  <p className="font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-slideIn">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-lg font-bold shadow-lg">
                        {user?.name?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                        <span className="inline-block mt-1 text-xs bg-primary text-white px-2 py-0.5 rounded-full font-medium">
                          {user?.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/about"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">My Profile</span>
                    </Link>
                    
                    <button
                      onClick={() => {
                        setShowProfileMenu(false)
                        dispatch(logout())
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-5 h-5 text-red-600" />
                      <span className="text-sm font-medium text-red-600">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto bg-background">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
