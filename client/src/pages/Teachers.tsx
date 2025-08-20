import { useEffect, useState } from 'react'
import { listTeachers } from '../lib/api'
import TeacherCard from '../components/TeacherCard'

export default function Teachers(){
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    listTeachers({}).then(setItems)
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 mt-6">
      <h1 className="text-2xl font-semibold mb-4">Giáo viên</h1>
      <div className="grid gap-3">
        {items.map(t => <TeacherCard key={t.id} id={t.id} name={t.name} photoUrl={t.photoUrl} ratePer25={t.teacherProfile?.ratePer25 ?? 99000} skills={t.teacherProfile?.skills ?? []} rating={t.teacherProfile?.rating ?? 5} />)}
      </div>
    </div>
  )
}
