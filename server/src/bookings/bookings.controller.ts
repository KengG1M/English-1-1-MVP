import { Body, Controller, Post, Req } from '@nestjs/common'
import { BookingsService } from './bookings.service'

@Controller('bookings')
export class BookingsController {
  constructor(private readonly svc: BookingsService) {}

  @Post('trial')
  trial(@Req() req: any, @Body() body: { teacherId: string; startUtc: string; minutes?: number }){
    const studentId = req?.user?.sub ?? 'demo-student-id'
    return this.svc.bookTrial(studentId, body.teacherId, body.startUtc, body.minutes ?? 25)
  }
}
