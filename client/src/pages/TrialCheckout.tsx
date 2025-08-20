import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getTeacher, bookTrial } from '../lib/api'

export default function TrialCheckout(){
  const [sp] = useSearchParams()
  const nav = useNavigate()
  const teacherId = sp.get('teacherId')!
  const start = sp.get('start')!
  const [teacher, setTeacher] = useState<any>()

  useEffect(() => { if(teacherId) getTeacher(teacherId).then(setTeacher) }, [teacherId])

  const confirm = async () => {
    await bookTrial(teacherId, start)
    nav('/dashboard')
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-xl font-semibold mb-2">Xác nhận học thử</h1>
      <div className="border rounded-2xl p-4 mb-4">
        <div>Giáo viên: {teacher?.name}</div>
        <div>Thời gian: {new Date(start).toLocaleString()}</div>
        <div>Thời lượng: 25 phút</div>
      </div>
      <button onClick={confirm} className="w-full py-3 rounded-xl bg-black text-white">Xác nhận đặt lịch</button>
    </div>
  )
}
