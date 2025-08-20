import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService){}

  async list(){
    return this.prisma.package.findMany({ where: { isActive: true } })
  }

  async mockCheckout(packageId: string){
    const pkg = await this.prisma.package.findUnique({ where: { id: packageId } })
    if(!pkg) return { ok: false, message: 'Package not found' }
    return { ok: true, status: 'PAID', packageId }
  }
}
