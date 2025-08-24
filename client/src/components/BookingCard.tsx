// client/src/components/BookingCard.tsx
import { format } from 'date-fns'
import ComingSoonFeature from '../pages/ComingSoonFeature'

type Booking = {
  id: string
  teacherId: string
  teacherName?: string
  type: 'TRIAL' | 'PAID'
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'COMPLETED'
  startUtc: string
  endUtc: string
  minutes?: number
}

export default function BookingCard({ b }: { b: Booking }) {
  const start = new Date(b.startUtc)
  const end = new Date(b.endUtc)
  const dateStr = format(start, 'EEE, dd/MM • HH:mm') + ' – ' + format(end, 'HH:mm')

  const chip = (txt: string) => (
    <span className="text-[11px] px-2 py-1 rounded-full border border-white/15 text-white/80">{txt}</span>
  )

  return (
    <div className="glass rounded-2xl p-4 flex items-center gap-4">
      <div className="size-12 rounded-xl bg-indigo-500/30 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 7h8M6 12h12M8 17h8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="font-medium text-white">{b.teacherName || 'Giáo viên • ' + b.teacherId.slice(0,6)}</div>
          <div className="flex items-center gap-1">
            {chip(b.type === 'TRIAL' ? 'Trial 25’' : 'Paid')}
            {chip(b.status)}
          </div>
        </div>
        <div className="text-white/70 text-sm mt-0.5">{dateStr}</div>
      </div>
      <button 
        className="hidden sm:inline-flex px-3 py-2 rounded-xl border border-white/15 hover:bg-white/5 text-white text-sm"
        // onClick=<ComingSoonFeature/> 
    >
        Chi tiết
      </button>
    </div>
  )
}
