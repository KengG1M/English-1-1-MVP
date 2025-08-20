import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { TeachersModule } from './teachers/teachers.module'
import { BookingsModule } from './bookings/bookings.module'
import { PackagesModule } from './packages/packages.module'
import { ReviewsModule } from './reviews/reviews.module'

@Module({
  imports: [TeachersModule, BookingsModule, PackagesModule, ReviewsModule],
  providers: [PrismaService],
})
export class AppModule {}
