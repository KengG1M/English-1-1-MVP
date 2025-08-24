import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(email: string, password: string, name?: string) {
    const existed = await this.prisma.user.findUnique({ where: { email } })
    if (existed) throw new ConflictException('Email already registered')

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await this.prisma.user.create({
      data: { email, name, passwordHash, role: 'STUDENT' as any },
    })
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email })
    return { accessToken: token, user: { id: user.id, email: user.email, name: user.name, role: user.role } }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user || !user.passwordHash) throw new UnauthorizedException('Invalid credentials')
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) throw new UnauthorizedException('Invalid credentials')
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email })
    return { accessToken: token, user: { id: user.id, email: user.email, name: user.name, role: user.role } }
  }
}
