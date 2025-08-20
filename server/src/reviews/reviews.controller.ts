import { Body, Controller, Post } from '@nestjs/common'
import { ReviewsService } from './reviews.service'

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly svc: ReviewsService) {}

  @Post()
  create(@Body() body: { bookingId: string; rating: number; comment?: string }){
    return this.svc.create(body.bookingId, body.rating, body.comment)
  }
}
