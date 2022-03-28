import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SiteSchema, Site } from './schemas/sites.schema';
import { SitesController } from './sites.controller';
import { SitesService } from './sites.service';

@Module({
    controllers: [SitesController],
    providers: [SitesService],
    imports: [MongooseModule.forFeature([{ name: Site.name, schema: SiteSchema }])]
})
export class SitesModule {}
