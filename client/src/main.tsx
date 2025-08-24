// client/src/main.tsx
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Teachers from './pages/Teachers'
import TeacherDetail from './pages/TeacherDetail'
import TrialCheckout from './pages/TrialCheckout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import './index.css'
import { getUser, isLoggedIn, logout } from './lib/auth'
import { useEffect, useState } from 'react'

function AppNav(){
  const nav = useNavigate()
  const [auth, setAuth] = useState<{logged: boolean; name?: string}>({logged: false})

  useEffect(() => {
    const u = getUser()
    setAuth({ logged: isLoggedIn(), name: u?.name || u?.email })
  }, [])

  const doLogout = () => {
    logout()
    setAuth({logged: false})
    nav('/login')
  }

  return (
    <div className="">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between text-white">
        <Link to="/" className="font-bold">English 1-1</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link className="hover:underline" to="/teachers">Teachers</Link>
          <Link className="hover:underline" to="/dashboard">Dashboard</Link>
          {auth.logged ? (
            <>
              <span className="text-gray-600">Hi, {auth.name}</span>
              <button onClick={doLogout} className="px-3 py-1.5 rounded-lg border">Log out</button>
            </>
          ) : (
            <>
              <Link className="hover:underline" to="/login">Login</Link>
              <Link to="/register" className="px-3 py-1.5 rounded-lg bg-white text-black hover:bg-green-600 hover:text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
   
  )
}

function App(){
  return (
    <BrowserRouter>
      <AppNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/teachers/:id" element={<TeacherDetail />} />
        <Route path="/checkout/trial" element={<TrialCheckout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
