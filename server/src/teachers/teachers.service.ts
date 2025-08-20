import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { addDays, startOfWeek } from 'date-fns'

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService){}

  async list(q: any){
    const where: any = { role: 'TEACHER', teacherProfile: { isActive: true } }
    if(q.skills){
      const skills = String(q.skills).split(',').map((s:string)=>s.trim())
      where.teacherProfile = { ...(where.teacherProfile||{}), skills: { hasSome: skills } }
    }
    if(q.minRate || q.maxRate){
      const rateCond: any = {}
      if(q.minRate) rateCond.gte = Number(q.minRate)
      if(q.maxRate) rateCond.lte = Number(q.maxRate)
      where.teacherProfile = { ...(where.teacherProfile||{}), ratePer25: rateCond }
    }
    return this.prisma.user.findMany({
      where,
      select: { id: true, name: true, email: true, teacherProfile: true }
    })
  }

  async get(id: string){
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, teacherProfile: true }
    })
  }

  async availability(teacherUserId: string, weekStart?: string){
    const teacher = await this.prisma.user.findUnique({ where: { id: teacherUserId }, include: { teacherProfile: true } })
    if(!teacher?.teacherProfile) return []
    const base = weekStart ? new Date(weekStart) : startOfWeek(new Date(), { weekStartsOn: 1 })
    const end = addDays(base, 7)
    return this.prisma.availabilitySlot.findMany({
      where: { teacherId: teacher.teacherProfile.id, startUtc: { gte: base, lt: end } },
      orderBy: { startUtc: 'asc' },
      select: { startUtc: true, endUtc: true }
    })
  }
}
