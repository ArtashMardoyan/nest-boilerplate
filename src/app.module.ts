import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { getMongoConfig } from './config/mongo.config';
import { SitesModule } from './sites/sites.module';
import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration]
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig
        }),
        SitesModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
