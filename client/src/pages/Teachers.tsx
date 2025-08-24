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
      <h1 className="text-3xl font-semibold mb-4">Teacher</h1>
      <div className="glass rounded-lg grid gap-9 p-6">
        <div className=''>
          {items.map(t => <TeacherCard 
            key={t.id} id={t.id} 
            name={t.name} 
            photoUrl={t.photoUrl} 
            ratePer25={t.teacherProfile?.ratePer25 ?? 99000} 
            skills={t.teacherProfile?.skills ?? []} 
            rating={t.teacherProfile?.rating ?? 5} />)}
        </div>
      </div>
    </div>
  )
}
