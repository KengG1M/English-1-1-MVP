import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTeacher, getAvailability } from '../lib/api'
import { format } from 'date-fns'

export default function TeacherDetail(){
  const { id } = useParams()
  const nav = useNavigate()
  const [teacher, setTeacher] = useState<any>()
  const [slots, setSlots] = useState<{startUtc:string,endUtc:string}[]>([])

  useEffect(() => {
    if(!id) return
    getTeacher(id).then(setTeacher)
    getAvailability(id).then(setSlots)
  }, [id])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex gap-6">
        <img src={teacher?.photoUrl || '/placeholder.png'} className="w-32 h-32 rounded-2xl object-cover" />
        <div>
          <h1 className="text-2xl font-bold">{teacher?.name}</h1>
          <p className="text-gray-600">{teacher?.teacherProfile?.bio}</p>
          <div className="mt-2 text-sm">{teacher?.teacherProfile?.skills?.join(' • ')}</div>
        </div>
      </div>

      <h2 id="book" className="mt-8 mb-3 font-semibold">Chọn lịch học thử (25')</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {slots.map((s, i) => (
          <button key={i} onClick={() => nav(`/checkout/trial?teacherId=${id}&start=${encodeURIComponent(s.startUtc)}`)} className="border rounded-xl p-3 text-sm">
            {format(new Date(s.startUtc), 'dd/MM HH:mm')}
          </button>
        ))}
      </div>
    </div>
  )
}
