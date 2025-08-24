import { Body, Controller, Post, Get, Query, Req, UseGuards } from '@nestjs/common'
import { BookingsService } from './bookings.service'
import { JwtAuthGuard } from '../auth/jwt.guard' // import JwtAuthGuard to protect routes đặt lịch


@Controller('bookings')
@UseGuards(JwtAuthGuard) // Apply guard to all routes in this controller to require authentication
export class BookingsController {
  constructor(private readonly svc: BookingsService) {}

  @Post('trial')
  trial(@Req() req: any, @Body() body: { teacherId: string; startUtc: string; minutes?: number }){
    const studentId = req.user.sub
    return this.svc.bookTrial(studentId, body.teacherId, body.startUtc, body.minutes ?? 25)
  }

  @Get('my')
  async my(@Req() req: any, @Query('range') range: 'upcoming'|'past' = 'upcoming') {
    return this.svc.myBookings(req.user.sub, range)
  }
}
