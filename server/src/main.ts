import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }) // turn on CORS
  // Cho phép chạy song song FE/BE ở local mà không gặp lỗi chặn CORS
  // Tiết kiệm thời gian: không cần cấu hình proxy Vite phức tạp trong tuần 1 code MVP
  // Dùng nhanh cho demo: team dev chỉ cần npm run dev ở FE và BE là api hoạt động 
  // để cors : true là cho phép tất cả (chỉ nên để như này trong quá trình dev MVP website)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  await app.listen(3000)
  console.log('🚀 Server ready at http://localhost:3000')
}
bootstrap()