import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){
  // clean mostly-empty DB
  await prisma.booking.deleteMany({})
  await prisma.availabilitySlot.deleteMany({})
  await prisma.teacherProfile.deleteMany({})
  await prisma.package.deleteMany({})
  await prisma.user.deleteMany({})

  // create demo teachers
  const teachers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'emma@teacher.local', name: 'Emma Nguyen', role: 'TEACHER',
        teacherProfile: {
          create: {
            bio: 'IELTS Speaking 7.5+, chuyên Business English.',
            ratePer25: 99000,
            languages: ['English','Vietnamese'],
            accents: ['US'],
            skills: ['IELTS','Business','Tech English'],
            rating: 4.9,
            photoUrl: 'https://picsum.photos/seed/emma/200/200',
          }
        }
      },
      include: { teacherProfile: true }
    }),
    prisma.user.create({
      data: {
        email: 'john@teacher.local', name: 'John Tran', role: 'TEACHER',
        teacherProfile: {
          create: {
            bio: 'Tech English cho Dev/QA, luyện phỏng vấn.',
            ratePer25: 89000,
            languages: ['English','Vietnamese'],
            accents: ['UK'],
            skills: ['Tech English','Interview','Conversation'],
            rating: 4.8,
            photoUrl: 'https://picsum.photos/seed/john/200/200',
          }
        }
      },
      include: { teacherProfile: true }
    }),
    prisma.user.create({
      data: {
        email: 'alice@teacher.local', name: 'Alice Pham', role: 'TEACHER',
        teacherProfile: {
          create: {
            bio: 'Giao tiếp công sở, thuyết trình, email.',
            ratePer25: 79000,
            languages: ['English','Vietnamese'],
            accents: ['US'],
            skills: ['Business','Presentation','Email'],
            rating: 4.95,
            photoUrl: 'https://picsum.photos/seed/alice/200/200',
          }
        }
      },
      include: { teacherProfile: true }
    }),
  ])

  // availability: next 7 days, 3 slots/day at 12:00, 19:00, 21:00 VN time => convert to UTC (+7)
  const now = new Date()
  function vnToUtc(date: Date, hour: number){
    const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), hour - 7, 0, 0))
    return d
  }
  for(const t of teachers){
    for(let i=0;i<7;i++){
      const day = new Date(now.getTime() + i*24*60*60*1000)
      for(const h of [12, 19, 21]){
        const startUtc = vnToUtc(day, h)
        const endUtc = new Date(startUtc.getTime() + 25*60000)
        await prisma.availabilitySlot.create({
          data: { teacherId: t.teacherProfile!.id, startUtc, endUtc }
        })
      }
    }
  }

  // demo student
  await prisma.user.create({ data: { id: 'demo-student-id', email: 'demo@student.local', name: 'Demo Student', role: 'STUDENT' } })

  // packages
  await prisma.package.createMany({
    data: [
      { name: 'Starter 25’×4', minutesPerLesson: 25, lessons: 4, priceVnd: 349000, isActive: true },
      { name: 'Focus 25’×12', minutesPerLesson: 25, lessons: 12, priceVnd: 899000, isActive: true },
      { name: 'Deep 50’×8', minutesPerLesson: 50, lessons: 8, priceVnd: 1299000, isActive: true },
    ]
  })
}

main().then(()=>{
  console.log('Seed done')
}).catch(e=>{
  console.error(e); process.exit(1)
}).finally(async ()=>{
  await prisma.$disconnect()
})
