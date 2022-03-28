import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { SiteDocument, Site } from './schemas/sites.schema';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SitesService {
    constructor(@InjectModel(Site.name) private siteModel: Model<SiteDocument>) {}

    async create(createSiteDto: CreateSiteDto): Promise<Site> {
        const createdSite = new this.siteModel(createSiteDto);
        return createdSite.save();
    }

    async findAll(): Promise<Site[]> {
        return this.siteModel.find().exec();
    }

    async findOne(id: string): Promise<Site> {
        return this.siteModel.findById(id);
    }

    async update(id: string, updateSiteDto: UpdateSiteDto): Promise<Site> {
        return this.siteModel.findByIdAndUpdate(id, updateSiteDto, { new: true });
    }

    async remove(id: string): Promise<Site> {
        return this.siteModel.findByIdAndRemove(id);
    }
}
