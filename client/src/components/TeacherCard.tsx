import { Link } from 'react-router-dom'

type Props = {
  id: string
  name: string
  photoUrl?: string
  ratePer25: number
  skills: string[]
  rating?: number
}

export default function TeacherCard({ id, name, photoUrl, ratePer25, skills, rating }: Props){
  return (
    <div className="rounded-2xl shadow p-4 flex gap-4 items-center hover:shadow-lg transition">
      <img src={photoUrl || '/placeholder.png'} alt={name} className="w-20 h-20 rounded-xl object-cover" />
      <div className="flex-1">
        <div className="font-semibold text-lg">{name}</div>
        <div className="text-sm text-gray-600">{skills.join(' • ')}</div>
        <div className="text-sm">{(rating ?? 5).toFixed(1)} ⭐ · {ratePer25.toLocaleString()}₫ / 25'</div>
      </div>
      <div className="flex flex-col gap-2">
        <Link to={`/teachers/${id}`} className="px-4 py-2 rounded-xl bg-black text-white text-sm text-center hover:bg-slate-700">Xem chi tiết</Link>
        <Link to={`/teachers/${id}#book`} className="px-4 py-2 rounded-xl border text-sm text-center hover:bg-slate-200">Đặt học thử</Link>
      </div>
    </div>
  )
}
