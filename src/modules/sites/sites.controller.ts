import {
    Get,
    Put,
    Post,
    Body,
    Param,
    Query,
    Delete,
    HttpCode,
    UseGuards,
    Controller,
    HttpStatus
} from '@nestjs/common';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { User } from '../users/schemas/users.schema';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { SitesService } from './sites.service';
import { Site } from './schemas/sites.schema';

@Controller({ path: 'sites', version: ['1'] })
export class SitesController {
    constructor(private readonly sitesService: SitesService) {}

    @Post()
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.CREATED)
    async create(@AuthUser() user: User, @Body() createSiteDto: CreateSiteDto): Promise<Site> {
        const { _id: uId } = user;

        return this.sitesService.create(uId, createSiteDto);
    }

    @Get()
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async findAll(@AuthUser() user: User, @Query() { skip, limit }) {
        const { _id: uId } = user;

        // TODO Create a paginate validation pipe
        const pageOffset = parseInt(skip, 10) || 0;
        const pageLimit = parseInt(limit, 10) || 10;

        return this.sitesService.findAll(uId, pageOffset, pageLimit);
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async findOne(@AuthUser() { _id: uId }: User, @Param('id') id: string): Promise<Site> {
        return this.sitesService.findOne(uId, id);
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    async update(
        @AuthUser() { _id: uId }: User,
        @Param('id') id: string,
        @Body() updateSiteDto: UpdateSiteDto
    ): Promise<Site> {
        return this.sitesService.update(uId, id, updateSiteDto);
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    async remove(@AuthUser() { _id: uId }: User, @Param('id') id: string): Promise<Site> {
        return this.sitesService.remove(uId, id);
    }
}
