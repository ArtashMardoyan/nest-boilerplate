import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { User, UserDocument } from '../users/schemas/users.schema';
import { INVALID_CREDENTIALS } from './auth.constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async login(email: string, password: string) {
        const user = await this.userModel.findOne({ email });

        if (!user || !user.comparePassword(password)) {
            throw new UnauthorizedException(INVALID_CREDENTIALS);
        }

        return { user, accessToken: await this.jwtService.signAsync({ _id: user._id }) };
    }

    async findById(_id: string) {
        return this.userModel.findById(_id);
    }
}
