import { Module } from '@nestjs/common';

// Modules
import { UsersModule } from '../users/users.module';

// Components
import { AuthService } from './auth.service';
import { JwtService } from './jwt/jwt.service';

// Controllers
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
