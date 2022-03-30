import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';

import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EMAIL_EXIST_ERROR } from './user.constants';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { firstName, lastName, email, password } = createUserDto;

        const user = await this.userModel.findOne({ email }).exec();

        if (user) {
            throw new BadRequestException(EMAIL_EXIST_ERROR);
        }

        const createdUser = new this.userModel({ firstName, lastName, email, password });
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findById(id);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const { firstName, lastName } = updateUserDto;

        return this.userModel.findByIdAndUpdate(id, { firstName, lastName }, { new: true });
    }

    async remove(id: string): Promise<User> {
        return this.userModel.findByIdAndRemove(id);
    }
}
