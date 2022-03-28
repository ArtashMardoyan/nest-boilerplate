import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';

import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { SitesService } from './sites.service';
import { Site } from './schemas/sites.schema';

@Controller({ path: 'sites', version: ['1'] })
export class SitesController {
    constructor(private readonly sitesService: SitesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createSiteDto: CreateSiteDto): Promise<Site> {
        return this.sitesService.create(createSiteDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Site[]> {
        return this.sitesService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string): Promise<Site> {
        return this.sitesService.findOne(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: string, @Body() updateSiteDto: UpdateSiteDto): Promise<Site> {
        return this.sitesService.update(id, updateSiteDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    remove(@Param('id') id: string): Promise<Site> {
        return this.sitesService.remove(id);
    }
}