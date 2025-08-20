import { Controller, Get, Post, Body } from '@nestjs/common'
import { PackagesService } from './packages.service'

@Controller()
export class PackagesController {
  constructor(private readonly svc: PackagesService) {}

  @Get('packages')
  list(){ return this.svc.list() }

  @Post('checkout/package')
  checkout(@Body() body: { packageId: string }){ return this.svc.mockCheckout(body.packageId) }
}
