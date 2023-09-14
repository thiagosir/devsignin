import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { Request } from 'express';
import { User } from 'src/users/models/users.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User')
        private readonly usersModel: Model<User>,
    ) {}

    public async createAcessToken(userId: string): Promise<string> {
        return sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        });
    }

    public async validateUser(userId: string): Promise<User> {
        const user = await this.usersModel.findOne({_id: userId})
        if(!user){ 
            throw new UnauthorizedException(`User ${userId} not found`)
        }
        return user;
    }

    private jwtExtractor(request: Request): string {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new BadRequestException(`Bad Request.`)
        }

    }
}