import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Teachers from './pages/Teachers'
import TeacherDetail from './pages/TeacherDetail'
import TrialCheckout from './pages/TrialCheckout'
import Dashboard from './pages/Dashboard'
import './index.css'

function AppNav(){
  return (
    <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
      <Link to="/" className="font-bold">English 1‑1</Link>
      <div className="flex gap-4 text-sm">
        <Link to="/teachers">Teachers</Link>
        <Link to="/packages">Packages</Link>
        <Link to="/dashboard">Dashboard</Link>
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
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
