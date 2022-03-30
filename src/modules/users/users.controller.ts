import { Put, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Controller, UseGuards } from '@nestjs/common';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';

@Controller({ path: 'users', version: ['1'] })
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Put()
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async update(@AuthUser() user: User, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        const { _id } = user;

        return this.usersService.update(_id, updateUserDto);
    }

    @Delete()
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    async remove(@AuthUser() user: User): Promise<User> {
        const { _id } = user;

        return this.usersService.remove(_id);
    }
}
