// client/src/pages/Dashboard.tsx
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUser, isLoggedIn } from '../lib/auth'
import { getMyBookings } from '../lib/api'
import Section from '../components/Section'
import BookingCard from '../components/BookingCard'
import { Skeleton } from '../components/Skeleton'

type Booking = {
  id: string
  teacherId: string
  teacherName?: string
  type: 'TRIAL' | 'PAID'
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'COMPLETED'
  startUtc: string
  endUtc: string
}

export default function Dashboard(){
  const nav = useNavigate()
  const u = getUser()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<Booking[]>([])

  useEffect(() => {
    if (!isLoggedIn()) {
      nav('/login')
      return
    }
    (async () => {
      try {
        const data = await getMyBookings('upcoming')
        setItems(data)
      } catch {
        // Fallback mock để bạn xem UI nếu BE chưa có API
        const now = new Date()
        const start = new Date(now.getTime() + 2*60*60*1000)
        const end = new Date(start.getTime() + 25*60*1000)
        setItems([
          { id: 'm1', teacherId: 'tch_123', teacherName: 'Emma Nguyen', type: 'TRIAL', status: 'CONFIRMED', startUtc: start.toISOString(), endUtc: end.toISOString() },
          { id: 'm2', teacherId: 'tch_456', teacherName: 'John Tran', type: 'PAID', status: 'CONFIRMED', startUtc: new Date(start.getTime()+24*3600*1000).toISOString(), endUtc: new Date(end.getTime()+24*3600*1000).toISOString() },
        ])
      } finally {
        setLoading(false)
      }
    })()
  }, [nav])

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Hero card */}
      <div className="glass rounded-3xl p-6 flex items-center justify-between">
        <div>
          <div className="text-sm text-white/70">Xin chào,</div>
          <h1 className="text-2xl font-bold text-white">{u?.name || u?.email || 'Học viên'}</h1>
          <p className="text-white/70 mt-1">Theo dõi lịch sắp tới và đặt buổi học nhanh chóng.</p>
        </div>
        <div className="hidden sm:flex gap-2">
          <Link to="/teachers" className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm">Tìm giáo viên</Link>
          <Link to="/teachers" className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5 text-white text-sm">Đặt học thử</Link>
        </div>
      </div>

      {/* Upcoming */}
      <Section title="Lịch học sắp tới" right={
        <Link to="/teachers" className="text-sm text-white/80 hover:text-white underline underline-offset-4">Đặt thêm</Link>
      }>
        {loading ? (
          <div className="grid gap-3">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
        ) : items.length === 0 ? (
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-white/80 font-medium">Chưa có lịch nào</div>
            <p className="text-white/60 text-sm mt-1">Bắt đầu bằng một buổi học thử 25’ miễn phí.</p>
            <Link to="/teachers" className="inline-flex mt-4 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm">Tìm giáo viên</Link>
          </div>
        ) : (
          <div className="grid gap-3">
            {items.map(b => <BookingCard key={b.id} b={b} />)}
          </div>
        )}
      </Section>

      {/* Quick actions on mobile */}
      <div className="sm:hidden grid grid-cols-2 gap-2 mt-6">
        <Link to="/teachers" className="btn-primary text-center">Tìm giáo viên</Link>
        <Link to="/teachers" className="btn-ghost text-center">Đặt học thử</Link>
      </div>
    </div>
  )
}
