import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { addMinutes, isBefore } from 'date-fns'

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService){}

  async bookTrial(studentId: string, teacherId: string, startUtcIso: string, minutes = 25){
    const startUtc = new Date(startUtcIso)
    const endUtc = addMinutes(startUtc, minutes)
    if (isBefore(endUtc, startUtc)) throw new ConflictException('Invalid time')

    return this.prisma.$transaction(async (tx) => {
      const teacher = await tx.user.findFirst({
        where: { id: teacherId, role: 'TEACHER', teacherProfile: { isActive: true } },
        include: { teacherProfile: true },
      })
      if(!teacher) throw new NotFoundException('Teacher not found')

      const taken = await tx.booking.findFirst({ where: { teacherId, startUtc } })
      if(taken) throw new ConflictException('Slot already booked')

      const hasSlot = await tx.availabilitySlot.findFirst({
        where: { teacherId: teacher.teacherProfile!.id, startUtc, endUtc },
      })
      if(!hasSlot) throw new ConflictException('Slot not available')

      // ensure student exists (demo student auto-create)
      let student = await tx.user.findUnique({ where: { id: studentId } })
      if(!student){
        student = await tx.user.create({ data: { id: studentId, email: 'demo@student.local', name: 'Demo Student', role: 'STUDENT' } })
      }

      return tx.booking.create({
        data: {
          type: 'TRIAL',
          status: 'CONFIRMED',
          teacherId,
          studentId: student.id,
          startUtc,
          endUtc,
        }
      })
    })
  }

  // server/src/bookings/bookings.service.ts
  async myBookings(studentId: string, range: 'upcoming'|'past') {
    const now = new Date()
    const where: any = { studentId }
    if (range === 'upcoming') where.startUtc = { gte: now }
    else where.startUtc = { lt: now }

    const rows = await this.prisma.booking.findMany({
      where, orderBy: { startUtc: 'asc' },
      include: { teacher: true }
    })
    return rows.map(r => ({
      id: r.id,
      teacherId: r.teacherId,
      teacherName: r.teacher?.name,
      type: r.type,
      status: r.status,
      startUtc: r.startUtc,
      endUtc: r.endUtc,
    }))
  }

}

