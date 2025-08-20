import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService){}

  create(bookingId: string, rating: number, comment?: string){
    return this.prisma.review.create({ data: { bookingId, rating, comment } })
  }
}
