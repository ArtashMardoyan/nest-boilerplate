import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

import { SiteDocument, Site } from './schemas/sites.schema';
import { SITE_NOT_FOUND_ERROR } from './sites.constants';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SitesService {
    constructor(@InjectModel(Site.name) private siteModel: Model<SiteDocument>) {}

    async create(uId: string, createSiteDto: CreateSiteDto): Promise<Site> {
        const { name, description, address } = createSiteDto;

        const createdSite = new this.siteModel({ name, description, address, uId });

        return createdSite.save();
    }

    async findAll(uId: string, skip: number, limit: number) {
        const condition = { uId };

        const [sites, [total = { count: 0 }]] = await Promise.all([
            this.siteModel.aggregate().match(condition).sort({ name: 1 }).skip(skip).limit(limit),
            this.siteModel.aggregate().match(condition).count('count')
        ]);

        return {
            docs: sites,
            limit,
            offset: skip,
            total: total.count,
            hasPrev: skip > 0,
            hasNext: total.count > skip + limit
        };
    }

    async findOne(uId: string, _id: string): Promise<Site> {
        return this.siteModel.findOne({ _id, uId });
    }

    async update(uId: string, _id: string, updateSiteDto: UpdateSiteDto): Promise<Site> {
        const { name, description, address } = updateSiteDto;

        const site = await this.siteModel.findOne({ _id, uId });

        if (!site) {
            throw new NotFoundException(SITE_NOT_FOUND_ERROR);
        }

        return this.siteModel.findByIdAndUpdate(_id, { name, description, address }, { new: true });
    }

    async remove(uId: string, _id: string): Promise<Site> {
        const site = await this.siteModel.findOne({ _id, uId });

        if (!site) {
            throw new NotFoundException(SITE_NOT_FOUND_ERROR);
        }

        return this.siteModel.findByIdAndRemove(_id);
    }
}
