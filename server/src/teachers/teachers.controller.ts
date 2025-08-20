import { Controller, Get, Param, Query } from '@nestjs/common'
import { TeachersService } from './teachers.service'

@Controller('teachers')
export class TeachersController {
  constructor(private readonly svc: TeachersService) {}

  @Get()
  list(@Query() q: any){
    return this.svc.list(q)
  }

  @Get(':id')
  get(@Param('id') id: string){
    return this.svc.get(id)
  }

  @Get(':id/availability')
  availability(@Param('id') id: string, @Query('weekStart') weekStart?: string){
    return this.svc.availability(id, weekStart)
  }
}
