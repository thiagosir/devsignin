import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersSchema } from 'src/users/schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UsersSchema,
      }
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION
      }
    })
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}